export const scheduleType = {
  interval: "interval",
  cron: "cron",
} as const;

export type ScheduleType = (typeof scheduleType)[keyof typeof scheduleType];