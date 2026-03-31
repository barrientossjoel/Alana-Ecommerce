import Header from "@/components/Header";
import CartClient from "@/components/CartClient";

export default function CartPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-medium tracking-wide mb-8">Mi Carrito</h1>
                <CartClient />
            </main>
        </div>
    );
}
