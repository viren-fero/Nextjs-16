import { tasksQueue } from "@/lib/queue";

async function main() {
    // const updateJob = await tasksQueue.add("update_order", {
    //     orderId: 2,
    // });

    // const emailJob = await tasksQueue.add("send_order_email", {
    //     orderId: 2,
    // });

    // console.log("Update job:", updateJob.id);
    // console.log("Email job:", emailJob.id);

    // await tasksQueue.add("send_order_email", {
    //     orderId: 1,
    // });

    // await tasksQueue.add("send_order_email", {
    //     orderId: 2,
    // });

    // await tasksQueue.add("send_order_email", {
    //     orderId: 3,
    // });

    console.log("3 jobs added");

    await tasksQueue.add("update_order", {
        orderId: 1,
    });

    await tasksQueue.add("update_order", {
        orderId: 1,
    });

    console.log("2 jobs added");
}

main().catch(console.error).finally(() => process.exit(0));