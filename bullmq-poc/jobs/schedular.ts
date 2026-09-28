import { tasksQueue } from "@/lib/queue";

export async function registerSchedulers() {
    await tasksQueue.upsertJobScheduler(
        "check-pending-orders",
        {
            every: 60_000,
        },
        {
            name: "check_pending_orders",
            data: {},
        },
    );

    console.log("Job schedulers registered");
}