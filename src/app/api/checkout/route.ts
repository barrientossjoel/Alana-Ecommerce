import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { NextResponse } from "next/server";
// import { MercadoPagoConfig, Preference } from 'mercadopago'; // Uncomment when creds are ready

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, paymentMethod, items } = body;

    // Create unique Order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const total = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    // 1. Insert Order into DB
    await db.insert(orders).values({
      id: orderId,
      customerName,
      customerEmail,
      customerPhone,
      status: "pending",
      total,
      paymentMethod,
    });

    // 2. Insert Order Items into DB
    const itemsToInsert = items.map((item: any) => ({
      id: `ITEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      orderId,
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    await db.insert(orderItems).values(itemsToInsert);

    // 3. Handle Mercado Pago
    if (paymentMethod === "mercado_pago") {
      /*
      // Initialize MercadoPago
      const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
      const preference = new Preference(client);
 
      const response = await preference.create({
        body: {
          items: items.map((item: any) => ({
            id: item.id,
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS',
          })),
          payer: {
            name: customerName,
            email: customerEmail,
          },
          back_urls: {
            success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order_id=${orderId}`,
            failure: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
            pending: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
          },
          auto_return: 'approved',
          external_reference: orderId, // Crucial for Webhooks
        }
      });
 
      return NextResponse.json({ url: response.init_point }); // Or sandbox_init_point
      */

      // For now, return a mock URL since we don't have MP_ACCESS_TOKEN yet
      console.warn("Mercado Pago SDK is commented out pending real Access Token. Simulating success...");
      return NextResponse.json({ url: `/checkout/success?order_id=${orderId}&mock=true` });
    }

    // 4. Handle Transfer/Cash
    if (paymentMethod === "cash") {
      // Send Email with Transfer instructions (can be triggered here or asynchronously)
      // Return orderId to show success page with Bank details
      return NextResponse.json({ orderId });
    }

    return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Error processing checkout" }, { status: 500 });
  }
}
