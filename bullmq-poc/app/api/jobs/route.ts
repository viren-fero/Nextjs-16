import { NextResponse } from "next/server";
import { backgroundQueue, reportsQueue } from "@/lib/queue";

export async function POST(request: Request) {
  const body = await request.json();

  switch (body.type) {
    case "order-created":
      await backgroundQueue.add("order-created", {
        orderId: 1001,
        customerEmail: "customer@example.com",
      });
      break;

    case "order-delivered":
      await backgroundQueue.add("order-delivered", {
        orderId: 1001,
        customerEmail: "customer@example.com",
      });
      break;

    case "send-notification":
      await backgroundQueue.add("send-notification", {
        userId: 123,
        message: "Your order has been delivered",
      });
      break;

    case "generate-report":
      await reportsQueue.add("generate-report", {
        reportType: "orders",
        requestedBy: 123,
      });
      break;

    default:
      return NextResponse.json(
        { error: "Unknown job type" },
        { status: 400 },
      );
  }

  return NextResponse.json({
    message: `${body.type} job added`,
  });
}