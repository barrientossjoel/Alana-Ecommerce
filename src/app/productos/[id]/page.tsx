import Header from "@/components/Header";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import PurchaseButtons from "@/components/PurchaseButtons";

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const productList = await db.select().from(products).where(eq(products.id, resolvedParams.id));
    const product = productList[0];

    if (!product) {
        notFound();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12 bg-card p-8 border border-border rounded-xl shadow-xl">
                    {/* Left Column: Images */}
                    <div className="w-full md:w-1/2">
                        <ProductGallery images={product.images} name={product.name} inStock={product.inStock} />
                    </div>

                    {/* Right Column: Details */}
                    <div className="w-full md:w-1/2 flex flex-col pt-4">
                        <span className="text-muted-foreground text-xs tracking-widest uppercase mb-2">Nuevo</span>
                        <h1 className="text-3xl font-bold tracking-wide mb-6">{product.name}</h1>

                        <div className="flex flex-col gap-1 mb-6">
                            {product.originalPrice && (
                                <span className="text-muted-foreground line-through text-lg">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-semibold text-foreground">{formatPrice(product.currentPrice)}</span>
                                {product.ribbonText && (
                                    <span className="text-primary font-medium text-sm border border-primary/20 px-2 py-0.5 rounded">{product.ribbonText}</span>
                                )}
                            </div>
                            {product.installmentsText && (
                                <span className="text-primary font-medium mt-1">
                                    En {product.installmentsText}
                                </span>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-medium mb-3 border-b border-border pb-2">Descripción del producto</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                                {product.description || "Sin descripción disponible."}
                            </p>
                        </div>

                        <div className="mb-8 flex flex-col gap-2">
                            <span className="text-sm">
                                Disponibilidad: {product.inStock ? (
                                    <span className="text-primary font-medium">Stock disponible</span>
                                ) : (
                                    <span className="text-destructive font-medium">Agotado</span>
                                )}
                            </span>
                        </div>

                        <PurchaseButtons product={{
                            id: product.id,
                            name: product.name,
                            currentPrice: product.currentPrice,
                            images: product.images,
                            inStock: product.inStock
                        }} />

                    </div>
                </div>
            </main>
        </div>
    );
}
