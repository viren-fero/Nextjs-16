import { checkPendingOrders } from "@/workers/check-pending-orders";
import { sendOrderEmail } from "./handlers/send-order-email";
import { updateOrder } from "./handlers/update-order";

export const jobHandlers = {
  update_order: updateOrder,
  send_order_email: sendOrderEmail,
  check_pending_orders: checkPendingOrders,
};