export const scheduleType = {
  interval: "interval",
  cron: "cron",
} as const;

export type ScheduleType = (typeof scheduleType)[keyof typeof scheduleType];

export const jobStatus = {
  completed: "completed",
  failed: "failed",
} as const;

export type JobStatus = (typeof jobStatus)[keyof typeof jobStatus];

export const queueName = {
  default: "default",
  reports: "reports",
} as const;

export type QueueName = (typeof queueName)[keyof typeof queueName];