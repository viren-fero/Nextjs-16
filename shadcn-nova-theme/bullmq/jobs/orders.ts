import { queues } from "../index";
import type { JobDefinition } from "../index";

export const processOrder: JobDefinition<{ orderId: string }> = {
  name: "process-order",
  handler: async (data) => {
    console.log(`[process-order] processing order ${data.orderId}`);
    await queues.default.add("send-confirmation-email", { orderId: data.orderId });
  },
};

export const sendConfirmationEmail: JobDefinition<{ orderId: string }> = {
  name: "send-confirmation-email",
  handler: async (data) => {
    console.log(`[send-confirmation-email] sending email for order ${data.orderId}`);
  },
};
