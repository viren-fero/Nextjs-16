import { pgEnum } from "drizzle-orm/pg-core";

import { scheduleType, jobStatus } from "../constants";

export const scheduleTypeEnum = pgEnum("schedule_type", [
  scheduleType.interval,
  scheduleType.cron,
]);

export const jobStatusEnum = pgEnum("job_status", [
  jobStatus.completed,
  jobStatus.failed,
]);
