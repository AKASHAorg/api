import { EventSource } from 'cross-eventsource';
import { JsonAsString, AggregationDocument } from '@ceramicnetwork/codecs';
import { EventType } from '@ceramicnetwork/common';
import { decode } from 'codeco';
import path from 'path';
import { getRedisConnection } from '../queue/index.js';
import QuickLRU from 'quick-lru';
import modelsJobMapper from './models-job-mapper.js';
import createJob from '../queue/create-job.js';

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

export const enableDataFeed = async () => {
  const redis = getRedisConnection();
  const resumeToken = await redis.get(RESUME_DATA_FEED_TOKEN);
  const lru = new QuickLRU({ maxSize: 1000 });
  if (resumeToken) {
    console.log('resuming data feed from token', resumeToken);
    feedURL.searchParams.set('after', resumeToken);
  }
  source = new EventSource(feedURL.href);
  source.addEventListener('message', (event) => {
    const parsedData = decode(Codec, event.data);
    const streamId = parsedData.commitId.baseID.toString();

    if (parsedData.eventType === EventType.INIT) {
      const indexJob = modelsJobMapper(parsedData.metadata.model.toString());
      if (!indexJob) {
        return;
      }
      const key = indexStreamKey(streamId);
      if (lru.has(key)) {
        return;
      }
      lru.set(key, true);
      if (!createJob.hasOwnProperty(indexJob)) {
        console.warn(`no handler for job ${indexJob}`);
        return;
      }

      createJob[indexJob](streamId).catch((e: Error) => {
        console.error(e);
      });
      console.log('finished', indexJob, streamId);
      if (
        'resumeToken' in parsedData &&
        typeof parsedData.resumeToken === 'string'
      ) {
        redis.set(RESUME_DATA_FEED_TOKEN, parsedData.resumeToken);
      }
    }
  });

  source.addEventListener('error', (error) => {
    console.log('error', error);
  });

  console.info('data feed listeners added');
};

export const disableDataFeed = () => {
  if (!source) {
    return;
  }
  source.close();
  console.info('data feed listeners removed');
};
