import { Worker } from "bullmq";
import { redis } from "@/lib/redis";
import { jobHandlers } from "@/jobs/registry";
import { registerSchedulers } from "@/jobs/schedular";

async function main() {
  await registerSchedulers();
  const worker = new Worker(
    "tasks",
    async (job) => {
      console.log(`Processing job ${job.id}: ${job.name}`);

      const handler = jobHandlers[job.name as keyof typeof jobHandlers];

      if (!handler) {
        throw new Error(`Unknown job type: ${job.name}`);
      }

      await handler(job.data);
    },
    {
      connection: redis,
      concurrency: 3
    },
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on("failed", (job, error) => {
    console.error(`Job ${job?.id} failed:`, error);
  });

  console.log("Worker started...");
}

main().catch(console.error);