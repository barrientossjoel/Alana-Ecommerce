"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { cartState } from "@/store/cart";
import { useEffect, useState } from "react";

export default function CartIndicator() {
    const snap = useSnapshot(cartState);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const itemCount = snap.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Link href="/cart" className="flex items-center gap-2 hover:text-primary transition-colors ml-4 outline-none">
            <ShoppingCart className="w-4 h-4" suppressHydrationWarning />
            <span>{mounted ? itemCount : 0}</span>
        </Link>
    );
}
