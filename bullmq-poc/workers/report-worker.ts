import { Worker } from "bullmq";
import { redis } from "../lib/redis";

const worker = new Worker(
  "reports",
  async (job) => {
    switch (job.name) {
      case "generate-report":
        console.log("Generating report:", job.data);

        // TODO: generate report
        break;

      case "generate-large-report":
        console.log("Generating large report:", job.data);

        // TODO: generate large report
        break;

      default:
        throw new Error(`Unknown report job type: ${job.name}`);
    }
  },
  {
    connection: redis,
    concurrency: 2,
  },
);

worker.on("completed", (job) => {
  console.log(`Report job ${job.id} (${job.name}) completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Report job ${job?.id} (${job?.name}) failed:`, error);
});

console.log("Report worker started");