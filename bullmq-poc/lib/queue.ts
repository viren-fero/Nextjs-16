import { Queue } from "bullmq";
import { redis } from "./redis";

export const backgroundQueue = new Queue("background", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: 100,
    removeOnFail: 100,
  },
});

export const reportsQueue = new Queue("reports", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: 50,
    removeOnFail: 50,
  },
});

export const tasksQueue = new Queue("tasks", {
  connection: redis,
})