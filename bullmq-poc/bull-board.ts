import express from "express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { backgroundQueue, reportsQueue } from "./lib/queue";

const app = express();

const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [
    new BullMQAdapter(backgroundQueue),
    new BullMQAdapter(reportsQueue),
  ],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3002, () => {
  console.log(
    "Bull Board running at http://localhost:3002/admin/queues",
  );
});