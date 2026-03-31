import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: { order_id?: string, mock?: string } }) {
    const unresolvedSearchParams = await searchParams;
    const orderId = unresolvedSearchParams.order_id;
    const isMock = unresolvedSearchParams.mock === "true";

    let orderData = null;
    let itemsData = [];

    if (orderId) {
        const fetchedOrders = await db.select().from(orders).where(eq(orders.id, orderId));
        orderData = fetchedOrders[0];

        if (orderData) {
            itemsData = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="max-w-3xl mx-auto px-6 py-16 text-center">
                <div className="bg-card border border-border p-12 rounded-2xl shadow-xl flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>

                    {orderData ? (
                        <div className="text-muted-foreground space-y-4 mb-8">
                            <p>Tu orden <strong className="text-foreground">#{orderId}</strong> ha sido registrada con éxito.</p>

                            {isMock && (
                                <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 p-4 rounded-lg my-4 text-sm">
                                    <strong>Modo Pruebas:</strong> Esta compra fue simulada porque aún no se configuró el Access Token de Mercado Pago.
                                </div>
                            )}

                            {orderData.paymentMethod === "cash" && orderData.status === "pending" && (
                                <div className="bg-muted border border-border p-6 rounded-lg text-left mt-6">
                                    <h3 className="font-semibold text-lg text-foreground mb-3 border-b border-border pb-2">Instrucciones de Pago (Transferencia)</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Por favor, realiza la transferencia con descuento usando los siguientes datos y envíanos el comprobante por WhatsApp.</p>
                                    <ul className="text-sm space-y-2 text-muted-foreground">
                                        <li><span className="text-muted-foreground">Alias:</span> ALANA.ECOMMERCE.MP</li>
                                        <li><span className="text-muted-foreground">CBU/CVU:</span> 0000003100000000000000</li>
                                        <li><span className="text-muted-foreground">Titular:</span> Alana Tienda</li>
                                        <li><span className="text-muted-foreground">Monto a depositar:</span> <strong className="text-foreground">${orderData.total.toLocaleString("es-AR")}</strong></li>
                                    </ul>
                                </div>
                            )}

                            <p className="text-sm">Te hemos enviado un correo a <strong className="text-foreground">{orderData.customerEmail}</strong> con los detalles.</p>
                        </div>
                    ) : (
                        <p className="text-muted-foreground mb-8">No pudimos cargar los detalles de tu orden, pero si viste la pantalla de MercadoPago, ¡está todo en camino!</p>
                    )}

                    <Link href="/productos">
                        <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-widest uppercase">
                            Seguir Comprando
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
