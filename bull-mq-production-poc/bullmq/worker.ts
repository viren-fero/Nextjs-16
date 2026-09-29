import { Worker } from "bullmq";

import { db } from "../db";
import { jobResults } from "./schema";
import { jobStatus, queueName } from "./constants";
import type { QueueName } from "./constants";
import { connection, jobRegistry } from "./index";

const DEFAULT_CONCURRENCY = 5;

// per-queue overrides — anything not listed here falls back to DEFAULT_CONCURRENCY
const queueConcurrency: Partial<Record<QueueName, number>> = {
  [queueName.reports]: 2, // slow DB queries — cap how many run at once
};

const workers = Object.values(queueName).map((name) => {
  const worker = new Worker(
    name,
    async (job) => {
      const definition = jobRegistry.get(job.name);
      if (!definition) {
        throw new Error(`No handler registered for job "${job.name}"`);
      }
      await definition.handler(job.data);
    },
    { connection, concurrency: queueConcurrency[name] ?? DEFAULT_CONCURRENCY, },
  );

  worker.on("completed", async (job) => {
    console.log(`[worker:${name}] completed "${job.name}" (${job.id})`);
    await db.insert(jobResults).values({
      jobName: job.name,
      status: jobStatus.completed,
      data: job.data,
      result: job.returnvalue,
    });
  });

  worker.on("failed", async (job, err) => {
    console.error(`[worker:${name}] failed "${job?.name}" (${job?.id})`, err);
    await db.insert(jobResults).values({
      jobName: job?.name ?? "unknown",
      status: jobStatus.failed,
      data: job?.data,
      error: err.message,
    });
  });

  return worker;
});

console.log(`[worker] listening on queues: ${Object.values(queueName).join(", ")}`);

async function shutdown() {
  await Promise.all(workers.map((worker) => worker.close()));
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
