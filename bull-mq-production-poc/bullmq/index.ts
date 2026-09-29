import "dotenv/config";
import { Queue } from "bullmq";
import Redis from "ioredis";

import { jobs } from "./jobs";
import { scheduleType, queueName } from "./constants";
import type { QueueName } from "./constants";

export const jobConfig = {
  timezone: "UTC",
  redisUrl: process.env.REDIS_URL!,
};

export type ScheduleConfig =
  | { type: typeof scheduleType.cron; value: string }
  | { type: typeof scheduleType.interval; value: number };

export type JobDefinition<T = unknown> = {
  name: string;
  handler: (data: T) => Promise<void>;
  queueName?: QueueName; // omit to use the default queue
};

export const DEFAULT_QUEUE_NAME = queueName.default;

export const connection = new Redis(jobConfig.redisUrl, {
  maxRetriesPerRequest: null,
});

// applied to every queue: remove jobs from Redis right after they finish —
// job_results (Postgres) is the durable record now, Redis doesn't need to retain history
const defaultJobOptions = {
  removeOnComplete: true,
  removeOnFail: true,
} as const;

export const queues = {} as Record<QueueName, Queue>;
for (const name of Object.values(queueName)) {
  queues[name] = new Queue(name, { connection, defaultJobOptions });
}

export const jobRegistry = new Map(jobs.map((job) => [job.name, job]));
