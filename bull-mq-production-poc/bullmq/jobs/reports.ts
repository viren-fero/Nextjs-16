import type { JobDefinition } from "../index";
import { queueName } from "../constants";

export const generateReport: JobDefinition<{ reportId: string }> = {
  name: "generate-report",
  queueName: queueName.reports,
  handler: async (data) => {
    console.log(`[generate-report] generating report ${data.reportId}`);
    // slow DB query goes here
  },
};
