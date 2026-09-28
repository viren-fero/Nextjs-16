"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  async function addJob(type: string) {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });

    const data = await response.json();

    setMessage(data.message || data.error);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>BullMQ POC</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => addJob("order-created")}>
          Order Created
        </button>

        <button onClick={() => addJob("order-delivered")}>
          Order Delivered
        </button>

        <button onClick={() => addJob("send-notification")}>
          Send Notification
        </button>

        <button onClick={() => addJob("generate-report")}>
          Generate Report
        </button>
      </div>

      {message && <p>{message}</p>}
    </main>
  );
}