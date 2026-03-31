import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const CATEGORIES = [
    "Remeras",
    "Básicos",
    "Conjuntos",
    "Abrigos",
    "Pijamas",
    "Los más vendidos"
];

export default async function ProductosPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const resolvedParams = await searchParams;
    const category = resolvedParams.category;

    const allProducts = category && CATEGORIES.includes(category)
        ? await db.select().from(products).where(eq(products.category, category))
        : await db.select().from(products);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex flex-col gap-6 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-medium text-foreground tracking-wide mb-4 border-b border-border pb-2">
                            Categorías
                        </h2>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <Link
                                    href="/productos"
                                    className={`text-sm tracking-wide transition-colors ${!category ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    Todos los productos
                                </Link>
                            </li>
                            {CATEGORIES.map(cat => (
                                <li key={cat}>
                                    <Link
                                        href={`/productos?category=${encodeURIComponent(cat)}`}
                                        className={`text-sm tracking-wide transition-colors ${category === cat ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-3xl font-medium text-foreground tracking-wide mb-3">
                            {category ? category : "Todos los productos"}
                        </h1>
                        <p className="text-muted-foreground text-sm tracking-wide">
                            {allProducts.length} {allProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                        </p>
                    </div>

                    {allProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                            {allProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    originalPrice={p.originalPrice}
                                    currentPrice={p.currentPrice}
                                    installmentsText={p.installmentsText}
                                    ribbonText={p.ribbonText}
                                    inStock={p.inStock ?? true}
                                    images={p.images}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-card border border-border rounded-xl text-muted-foreground shadow-inner">
                            No hay productos en esta categoría por el momento.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
