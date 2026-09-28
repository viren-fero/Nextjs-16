import { Worker } from "bullmq";
import { redis } from "../lib/redis";

const worker = new Worker(
  "background",
  async (job) => {
    switch (job.name) {
      case "order-created":
        console.log("Processing order-created:", job.data);

        // TODO: send order-created email
        break;

      case "order-delivered":
        console.log("Processing order-delivered:", job.data);

        // TODO: send order-delivered email
        break;

      case "send-notification":
        console.log("Processing notification:", job.data);

        // TODO: send notification
        break;

      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  },
  {
    connection: redis,
    concurrency: 5,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} (${job.name}) completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} (${job?.name}) failed:`, error);
});

console.log("Background worker started");