"use client";

import { useSnapshot } from "valtio";
import { cartState, CartItem, clearCart } from "@/store/cart";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CartClient() {
    const snap = useSnapshot(cartState);
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="animate-pulse text-muted-foreground">Cargando carrito...</div>;

    const items = snap.items as CartItem[];
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
                <h2 className="text-xl font-medium text-muted-foreground mb-4">Tu carrito está vacío</h2>
                <a href="/productos" className="text-primary hover:underline">Ir a comprar</a>
            </div>
        );
    }

    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            customerName: formData.get("customerName"),
            customerEmail: formData.get("customerEmail"),
            customerPhone: formData.get("customerPhone"),
            paymentMethod: formData.get("paymentMethod"),
            items: items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price, name: i.name }))
        };

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (result.url) {
                // Redirect to Mercado Pago
                window.location.href = result.url;
            } else if (result.orderId) {
                // Success for manual payment
                clearCart();
                window.location.href = `/checkout/success?order_id=${result.orderId}`;
            }
        } catch (err) {
            console.error(err);
            toast.error("Error al procesar el pago.");
        } finally {
            setLoading(false);
        }
    };

    const removeItem = (id: string) => {
        const i = cartState.items.findIndex((item) => item.id === id);
        if (i !== -1) cartState.items.splice(i, 1);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            {/* Items list */}
            <div className="lg:w-2/3 flex flex-col gap-6">
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border-b border-border last:border-0">
                            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-muted rounded-md" />
                            <div className="flex-1 flex flex-col gap-1">
                                <span className="font-semibold text-lg">{item.name}</span>
                                <span className="text-muted-foreground text-sm">Cantidad: {item.quantity}</span>
                                <span className="font-medium text-primary">
                                    ${(item.price * item.quantity).toLocaleString("es-AR")}
                                </span>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Checkout form */}
            <div className="lg:w-1/3">
                <form onSubmit={handleCheckout} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6 sticky top-24">
                    <h2 className="text-xl font-medium border-b border-border pb-3">Resumen</h2>

                    <div className="flex justify-between items-center text-lg">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-bold text-2xl text-foreground">${total.toLocaleString("es-AR")}</span>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1 block">Nombre y Apellido</label>
                            <Input name="customerName" required className="bg-background border-border text-foreground" />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1 block">Email</label>
                            <Input name="customerEmail" type="email" required className="bg-background border-border text-foreground" />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1 block">Teléfono / WhatsApp</label>
                            <Input name="customerPhone" type="tel" required className="bg-background border-border text-foreground" />
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <label className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Método de Pago</label>
                            <label className="flex items-center gap-3 p-3 bg-background border border-border rounded cursor-pointer hover:border-primary transition-colors">
                                <input type="radio" name="paymentMethod" value="mercado_pago" defaultChecked className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">Mercado Pago (Tarjetas, Dinero en cuenta)</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 bg-background border border-border rounded cursor-pointer hover:border-primary transition-colors">
                                <input type="radio" name="paymentMethod" value="cash" className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">Transferencia / Efectivo (15% OFF)</span>
                            </label>
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-widest uppercase mt-4">
                        {loading ? "Procesando..." : "Proceder al Pago"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
