import { NextResponse } from "next/server";
// import { MercadoPagoConfig, Payment } from "mercadopago";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
// import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const type = url.searchParams.get("type");
        const dataId = url.searchParams.get("data.id");

        if (type === "payment" && dataId) {
            // 1. Verify payment with MP API
            /*
            const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: dataId });
            
            if (paymentData.status === "approved") {
              const orderId = paymentData.external_reference;
              
              // 2. Update DB
              if (orderId) {
                  await db.update(orders)
                  .set({ status: "paid" })
                  .where(eq(orders.id, orderId));
      
                  // 3. Send Email
                  // const resend = new Resend(process.env.RESEND_API_KEY);
                  const orderInfo = await db.select().from(orders).where(eq(orders.id, orderId));
                  const email = orderInfo[0]?.customerEmail;
      
                  if (email) {
                  await resend.emails.send({
                      from: "onboarding@resend.dev", // Free testing domain from Resend
                      to: email,
                      subject: `¡El pago de tu orden ${orderId} fue aprobado!`,
                      html: `<h1>¡Gracias por comprar en Alana!</h1><p>Tu pago fue recibido correctamente. Nuestro equipo preparará tu pedido.</p>`
                  });
                  }
              }
            }
            */
            console.warn(`Webhook received for payment ${dataId}, but Mercado Pago/Resend logic is mocked out pending Credentials.`);
        }

        return NextResponse.json({ status: "success" });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
