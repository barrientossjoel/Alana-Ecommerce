import { proxy, subscribe } from "valtio";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export const cartState = proxy<{ items: CartItem[] }>({ items: [] });

if (typeof window !== "undefined") {
    const saved = localStorage.getItem("alana-cart");
    if (saved) {
        cartState.items = JSON.parse(saved);
    }

    subscribe(cartState, () => {
        localStorage.setItem("alana-cart", JSON.stringify(cartState.items));
    });
}

export const addCartItem = (item: Omit<CartItem, "quantity">) => {
    const existing = cartState.items.find((i) => i.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cartState.items.push({ ...item, quantity: 1 });
    }
};

export const clearCart = () => {
    cartState.items = [];
};
