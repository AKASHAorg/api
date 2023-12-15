import { Job, MetricsTime, Queue, Worker } from "bullmq";
import { Redis } from 'ioredis';
import process from "process";
import { INDEXING_QUEUE_NAME } from "./config.js";
import worker from "./worker.js";


export const getRedisConnection = () => {
  const connectionString = process.env?.REDIS_CONNECTION_STRING.trim();
  if(!connectionString) {
    throw new Error("REDIS_CONNECTION_STRING is not set");
  }
  return new Redis(connectionString);
}

export const createQueue = (queueName: string) => {
  const connection = getRedisConnection();
  connection.options.maxRetriesPerRequest = null;
  return new Queue(queueName, { connection: connection });
}

export const createWorker = (queueName: string, handler: string | ((job: Job) => Promise<unknown>)) => {
  const connection = getRedisConnection();
  connection.options.maxRetriesPerRequest = null;
 return new Worker(
   queueName,
   handler,
   {
     connection: connection,
     metrics: {
       maxDataPoints: MetricsTime.ONE_WEEK * 2, // collect metrics for last 2 weeks
     },
     concurrency: 5,
     removeOnComplete: { count: 100 }, // keep last 100 completed jobs
     removeOnFail: { count: 2000 }, // keep last 2000 failed jobs
     limiter: {
       max: 5,
       duration: 1000, // 5 indexes per second
     },
   });
}


export const indexingQueue = createQueue(INDEXING_QUEUE_NAME);
export const indexingWorker = createWorker(INDEXING_QUEUE_NAME, worker);

indexingWorker.on("error", err => {
 console.error("Error in indexing worker", err);
})
indexingWorker.on('failed', (job: Job, error: Error) => {
 console.error("Indexing job failed", job.id, error);
});
indexingWorker.on('completed', (job: Job, returnValue: unknown) => {
  console.log("Indexing job completed", job.id, returnValue);
});
