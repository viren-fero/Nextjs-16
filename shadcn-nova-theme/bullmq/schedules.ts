import { logHeartbeat } from "./jobs/system";
import { scheduleType } from "./constants";
import type { ScheduleConfig, JobDefinition } from "./index";

export type ScheduleEntry = {
  job: JobDefinition;
  schedule: ScheduleConfig;
};

export const schedules: ScheduleEntry[] = [
  {
    job: logHeartbeat,
    schedule: {
      type: scheduleType.interval,
      value: 15000
    }
  },
];
