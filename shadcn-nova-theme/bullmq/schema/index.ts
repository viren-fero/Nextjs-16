import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { scheduleTypeEnum, jobStatusEnum } from "./enums";

export const scheduledTasks = pgTable(
  "scheduled_tasks",
  {
    id: serial("id").primaryKey(),

    // Unique identifier for this schedule row. Passed to BullMQ as the jobSchedulerId,
    // so it's what ties a Postgres row to a specific BullMQ job scheduler.
    key: text("key").notNull(),

    name: text("name").notNull(),

    // Must match a job's `name` in jobRegistry (bullmq/index.ts) — this is what the
    // worker looks up to find the handler to run.
    jobName: text("job_name").notNull(),

    enabled: boolean("enabled").notNull().default(true),

    scheduleType: scheduleTypeEnum("schedule_type").notNull(),

    // Format depends on scheduleType:
    // - "cron": a cron pattern string, e.g. "0 * * * *"
    // - "interval": a plain integer string of milliseconds, e.g. "15000" (15s)
    scheduleValue: text("schedule_value").notNull(),

    // Passed as `data` to the job's handler each time it runs (BullMQ job template).
    args: jsonb("args").notNull().default({}),

    // When set, delays the first run until this time (BullMQ repeat option `startDate`).
    // Null means start immediately, per the scheduleType's cadence.
    startAt: timestamp("start_at", {
      withTimezone: true,
    }),

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

export const jobResults = pgTable("job_results", {
  id: serial("id").primaryKey(),

  jobName: text("job_name").notNull(),

  status: jobStatusEnum("status").notNull(),

  // the job's input data, for debugging
  data: jsonb("data"),

  // whatever the handler returned, if anything
  result: jsonb("result"),

  // error message, only set when status is "failed"
  error: text("error"),

  finishedAt: timestamp("finished_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export * from "./enums";
