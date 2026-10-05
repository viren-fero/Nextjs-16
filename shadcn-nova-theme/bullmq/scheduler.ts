import { Client } from "pg";

import { db } from "../db";
import { scheduledTasks } from "./schema";
import { scheduleType, queueName } from "./constants";
import { jobConfig, jobRegistry, queues, DEFAULT_QUEUE_NAME } from "./index";
import { schedules } from "./schedules";

const ADVISORY_LOCK_KEY = 851917;
const RECONCILE_INTERVAL_MS = 10_000;

async function seedDefaults() {
  for (const entry of schedules) {
    await db
      .insert(scheduledTasks)
      .values({
        key: entry.job.name,
        name: entry.job.name,
        jobName: entry.job.name,
        scheduleType: entry.schedule.type,
        scheduleValue: String(entry.schedule.value),
      })
      .onConflictDoNothing({ target: scheduledTasks.key });
  }
}

function toRepeatOptions(row: typeof scheduledTasks.$inferSelect) {
  const startDate = row.startAt ?? undefined;
  if (row.scheduleType === scheduleType.cron) {
    return { pattern: row.scheduleValue, tz: jobConfig.timezone, startDate };
  }
  return { every: Number(row.scheduleValue), tz: jobConfig.timezone, startDate };
}

async function reconcile() {
  const rows = await db.select().from(scheduledTasks);

  for (const name of Object.values(queueName)) {
    const queue = queues[name];
    const enabledRows = rows.filter(
      (row) => row.enabled && (jobRegistry.get(row.jobName)?.queueName ?? DEFAULT_QUEUE_NAME) === name,
    );

    for (const row of enabledRows) {
      await queue.upsertJobScheduler(row.key, toRepeatOptions(row), { name: row.jobName, data: row.args });
    }

    const enabledKeys = new Set(enabledRows.map((row) => row.key));
    for (const scheduler of await queue.getJobSchedulers()) {
      if (!enabledKeys.has(scheduler.key)) await queue.removeJobScheduler(scheduler.key);
    }
  }
}

let currentClient: Client | null = null;

async function runAsLeaderOnce() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  currentClient = client;

  console.log("[scheduler] waiting for leadership...");
  await client.query("SELECT pg_advisory_lock($1)", [ADVISORY_LOCK_KEY]); // blocks until we're the leader
  console.log("[scheduler] acquired leader lock — active");

  await seedDefaults();
  await reconcile();
  const timer = setInterval(
    () => reconcile().catch((err) => console.error("[scheduler] reconcile failed", err)),
    RECONCILE_INTERVAL_MS,
  );

  await new Promise((resolve) => client.once("end", resolve)); // blocks until connection drops
  clearInterval(timer);
  currentClient = null;
}

async function main() {
  while (true) {
    await runAsLeaderOnce();
    console.log("[scheduler] lost leadership, retrying...");
  }
}

async function shutdown() {
  if (currentClient) {
    await currentClient.query("SELECT pg_advisory_unlock($1)", [ADVISORY_LOCK_KEY]).catch(() => {});
    await currentClient.end();
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

main();
