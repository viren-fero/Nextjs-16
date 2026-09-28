export async function sendOrderEmail(data: { orderId: number }) {
  console.log(`EMAIL START → order ${data.orderId}`);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log(`EMAIL END → order ${data.orderId}`);
}