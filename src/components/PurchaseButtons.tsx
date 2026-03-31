"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addCartItem } from "@/store/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PurchaseButtonsProps {
    product: {
        id: string;
        name: string;
        currentPrice: number;
        images: string[];
        inStock: boolean | null;
    };
}

export default function PurchaseButtons({ product }: PurchaseButtonsProps) {
    const router = useRouter();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addCartItem({
            id: product.id,
            name: product.name,
            price: product.currentPrice,
            image: product.images[0] || "",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        toast.info("Redirigiendo al checkout...");
        router.push("/cart");
    };

    return (
        <>
            <Button
                disabled={!product.inStock}
                onClick={handleBuyNow}
                className="w-full h-14 bg-primary text-primary-foreground font-bold tracking-widest uppercase mb-3 border-none hover:bg-primary/90 transition-colors"
                style={{ backgroundColor: product.inStock ? undefined : "hsl(var(--muted))", pointerEvents: product.inStock ? "auto" : "none" }}
            >
                Comprar Ahora
            </Button>
            <Button
                disabled={!product.inStock}
                onClick={handleAddToCart}
                variant="outline"
                className="w-full h-14 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-widest uppercase transition-colors"
            >
                {added ? "¡Agregado al carrito!" : "Agregar al Carrito"}
            </Button>
        </>
    );
}
