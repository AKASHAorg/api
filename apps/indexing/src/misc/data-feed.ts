import { EventSource } from 'cross-eventsource';
import { JsonAsString, AggregationDocument } from '@ceramicnetwork/codecs';
import { EventType } from '@ceramicnetwork/common';
import { decode } from 'codeco';
import path from 'path';
import { getRedisConnection } from '../queue/index.js';
import QuickLRU from 'quick-lru';
import modelsJobMapper from './models-job-mapper.js';
import createJob from '../queue/create-job.js';
import { delistJobKey, JobNames } from "../queue/config.js";

if (!process.env?.CERAMIC_API_ENDPOINT) {
  throw new Error('CERAMIC_API_ENDPOINT env var is not set');
}

let source = null;
const feedURL = new URL(
  path.join(
    process.env.CERAMIC_API_ENDPOINT,
    'api/v0/feed/aggregation/documents',
  ),
);

const Codec = JsonAsString.pipe(AggregationDocument);

export const RESUME_DATA_FEED_TOKEN = 'ceramic:resume-data-feed:token';

const indexStreamKey = (streamId: string) => `ceramic:index-stream:${streamId}`;

const lru = new QuickLRU<string, string|boolean>({ maxSize: 1000, maxAge: 1000 * 60 * 60 * 24 * 2 });
const updateLRU = new QuickLRU({ maxSize: 1000,  maxAge: 1000 * 60 * 60 * 24 * 7});



/**
 * Indexes a stream for the specified indexJob.
 *
 * @param indexJob - The name of the indexing job to perform on the stream.
 * @param streamId - The ID of the stream to index.
 * @returns - void
 */
const indexStream = (indexJob: string, streamId: string)=>{
  if (!createJob.hasOwnProperty(indexJob)) {
    console.warn(`no indexStream handler for job ${indexJob}`);
    return;
  }

  createJob[indexJob](streamId).catch((e: Error) => {
    console.error(e);
  });
  console.log('finished', indexJob, streamId);
}

/**
 * Removes a stream from the indexing job.
 *
 * @param indexJob - The name of the indexing job to delist the stream from.
 * @param streamId - The ID of the stream to delist.
 * @returns - void
 */
const delistStream = (indexJob: string, streamId: string) => {
  const delistIndexJob = delistJobKey(indexJob);
  return indexStream(delistIndexJob, streamId);
}


/**
 * Enables the data feed by setting up an event source connection and handling incoming events.
 *
 * The function first checks if there is a resume token stored in Redis, and if so, it sets the 'after' parameter in the feed URL to resume the feed from that point.
 * It then creates a new EventSource connection to the feed URL and adds event listeners for 'message' and 'error' events.
 *
 * For each 'message' event, the function decodes the event data, extracts the stream ID and index job, and then either indexes the stream or deindexes it based on the event type and metadata.
 * The function also saves the latest resume token in an in-memory cache and in Redis.
 */
export const enableDataFeed = async () => {
  const redis = getRedisConnection();
  const resumeToken = await redis.get(RESUME_DATA_FEED_TOKEN);
  if (resumeToken) {
    console.log('resuming data feed from token', resumeToken);
    feedURL.searchParams.set('after', resumeToken);
  }
  source = new EventSource(feedURL.href);

  source.addEventListener('message', (event) => {
    const parsedData = decode(Codec, event.data);
    const streamId = parsedData.commitId.baseID.toString();
    const indexJob = modelsJobMapper(parsedData.metadata.model.toString());
    if (!indexJob) {
      return;
    }

    /**
     * if the event is a DATA event, we should check if the stream should be updated or removed.
     */
    if (parsedData.eventType === EventType.DATA) {
      const key = indexStreamKey(streamId);
      if (updateLRU.has(key)) {
        return;
      }
      updateLRU.set(key, true);

      if('shouldIndex' in parsedData.metadata){
        if (parsedData.metadata.shouldIndex === false) {
          delistStream(indexJob, streamId);
        }
        return;
      }
      if(indexJob === JobNames.indexProfile){
        indexStream(indexJob, streamId);
      }
    }

    /**
     * if the event is a INIT event, we should check if the stream should be indexed
     */
    if (parsedData.eventType === EventType.INIT) {
      const key = indexStreamKey(streamId);
      if (lru.has(key)) {
        return;
      }
      if(parsedData.content !== null && parsedData.content !== undefined) {
        lru.set(key, true);
        indexStream(indexJob, streamId);
      }
    }

    /**
     * Save the resume token in memory after each message event
     */
    if (
      'resumeToken' in parsedData &&
      typeof parsedData.resumeToken === 'string'
    ) {
      lru.set(RESUME_DATA_FEED_TOKEN, parsedData.resumeToken);
    }
  });

  source.addEventListener('error', (error) => {
    console.log('error', error);
  });

  console.info('data feed listeners added');
};

/**
 * Disables the data feed by:
 * - Saving the current resume token to Redis if it exists
 * - Clearing the LRU caches
 * - Closing the data feed source
 */
export const disableDataFeed = () => {
  if (!source) {
    return;
  }
  const resumeToken = lru.get(RESUME_DATA_FEED_TOKEN);
  if (resumeToken && typeof resumeToken === "string") {
    console.log("saving resume token", resumeToken);
    getRedisConnection().set(RESUME_DATA_FEED_TOKEN, resumeToken);
  }
  lru.clear();
  updateLRU.clear();
  source.close();
  console.info('data feed listeners removed');
};
