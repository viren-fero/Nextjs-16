// import { db } from "../../db";
// import { orders } from "../../db/schema";
// import { eq } from "drizzle-orm";

// export async function updateOrder(data: { orderId: number }) {
//   console.log(`Job ${data.orderId}: reading order...`);

//   const [order] = await db
//     .select()
//     .from(orders)
//     .where(eq(orders.id, data.orderId));

//   if (!order) {
//     throw new Error(`Order ${data.orderId} not found`);
//   }

//   console.log(
//     `Job ${data.orderId}: current amount = ${order.amount}`,
//   );

//   // Simulate slow business logic
//   await new Promise((resolve) => setTimeout(resolve, 5000));

//   const newAmount = order.amount + 100;

//   await db
//     .update(orders)
//     .set({
//       amount: newAmount,
//     })
//     .where(eq(orders.id, data.orderId));

//   console.log(
//     `Job ${data.orderId}: updated amount → ${newAmount}`,
//   );
// }


import { db } from "../../db";
import { orders } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function updateOrder(data: { orderId: number }) {
  await db.transaction(async (tx) => {
    console.log(`Job ${data.orderId}: starting transaction`);

    const [order] = await tx
      .select()
      .from(orders)
      .where(eq(orders.id, data.orderId))
      .for("update");

    if (!order) {
      throw new Error(`Order ${data.orderId} not found`);
    }

    console.log(
      `Job ${data.orderId}: locked row, amount = ${order.amount}`,
    );

    // Simulate slow business logic
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const newAmount = order.amount + 100;

    await tx
      .update(orders)
      .set({
        amount: newAmount,
      })
      .where(eq(orders.id, data.orderId));

    console.log(
      `Job ${data.orderId}: updated amount → ${newAmount}`,
    );
  });

  console.log(`Job ${data.orderId}: transaction committed`);
}