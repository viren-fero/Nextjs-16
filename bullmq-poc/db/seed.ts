import { db } from "./index";
import { orders } from "./schema";

async function main() {
  const result = await db
    .insert(orders)
    .values([
      {
        customerName: "Alice",
        amount: 500,
      },
      {
        customerName: "Bob",
        amount: 750,
      },
      {
        customerName: "Charlie",
        amount: 1000,
      },
    ])
    .returning();

  console.log(result);
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));