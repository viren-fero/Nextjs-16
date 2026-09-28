import { pgEnum } from "drizzle-orm/pg-core";

import { scheduleType } from "./constants";

export const scheduleTypeEnum = pgEnum("schedule_type", [
  scheduleType.interval,
  scheduleType.cron,
]);