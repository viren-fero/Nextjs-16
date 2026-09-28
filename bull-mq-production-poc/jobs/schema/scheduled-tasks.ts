import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { scheduleTypeEnum } from "../enums";

export const scheduledTasks = pgTable(
  "scheduled_tasks",
  {
    id: serial("id").primaryKey(),

    key: text("key").notNull(),

    name: text("name").notNull(),

    jobName: text("job_name").notNull(),

    enabled: boolean("enabled").notNull().default(true),

    scheduleType: scheduleTypeEnum("schedule_type").notNull(),

    scheduleValue: text("schedule_value").notNull(),

    args: jsonb("args").notNull().default({}),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("scheduled_tasks_key_unique").on(table.key),
  ],
);