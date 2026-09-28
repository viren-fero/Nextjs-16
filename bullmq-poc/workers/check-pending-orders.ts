import { db } from "@/db/index";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkPendingOrders() {
  const pendingOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.status, "pending"));

  console.log(
    `Scheduled check: ${pendingOrders.length} pending orders`,
  );
}