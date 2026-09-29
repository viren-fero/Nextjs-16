import type { JobDefinition } from "../index";

export const logHeartbeat: JobDefinition = {
  name: "log-heartbeat",
  handler: async (data) => {
    console.log(`[log-heartbeat] ${new Date().toISOString()}`, data ?? {});
  },
};
