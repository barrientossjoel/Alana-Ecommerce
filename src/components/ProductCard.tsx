"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { addCartItem } from "@/store/cart";

interface ProductCardProps {
    id: string;
    name: string;
    originalPrice: number | null;
    currentPrice: number;
    installmentsText: string | null;
    ribbonText: string | null;
    inStock: boolean;
    images: string[];
}

export default function ProductCard({
    id,
    name,
    originalPrice,
    currentPrice,
    installmentsText,
    ribbonText,
    inStock,
    images,
}: ProductCardProps) {
    // Format prices like $13.334,00
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);
    };

    return (
        <div className="group flex flex-col relative w-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted w-full block">
                <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                        {images.map((img, i) => (
                            <CarouselItem key={i} className="h-full relative pl-0">
                                <Link href={`/productos/${id}`} className="block w-full h-full cursor-pointer relative">
                                    <Image
                                        src={img}
                                        alt={`${name} - ${i + 1}`}
                                        width={800}
                                        height={1000}
                                        className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${!inStock ? "opacity-60" : ""}`}
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {images.length > 1 && (
                        <>
                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white border-0 hover:bg-black w-8 h-8 pointer-events-auto" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white border-0 hover:bg-black w-8 h-8 pointer-events-auto" />
                        </>
                    )}
                </Carousel>

                {/* Top Right Ribbon */}
                {ribbonText && (
                    <div className="absolute top-0 right-0 bg-black/80 text-white text-[10px] px-2 py-1 font-semibold tracking-wider pointer-events-none">
                        {ribbonText}
                    </div>
                )}

                {/* Out of Stock Overlay Text */}
                {!inStock && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-gray-300 text-sm tracking-[0.2em] font-medium bg-black/20 px-4 py-2 uppercase">
                            Sin stock
                        </span>
                    </div>
                )}
            </div>

            <div className="pt-4 flex flex-col items-center justify-center text-center">
                <Link href={`/productos/${id}`} className="hover:text-muted-foreground transition-colors flex flex-col items-center">
                    <h3 className="text-foreground text-sm tracking-widest font-medium uppercase mb-1">
                        {name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-sm tracking-wider mb-1">
                        {originalPrice && (
                            <span className="text-muted-foreground line-through">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                        <span className="text-foreground font-semibold">
                            {formatPrice(currentPrice)}
                        </span>
                    </div>
                    {installmentsText && (
                        <p className="text-muted-foreground text-[11px] tracking-wide mb-3">
                            {installmentsText}
                        </p>
                    )}
                </Link>

                {inStock && (
                    <button
                        onClick={() => addCartItem({ id, name, price: currentPrice, image: images[0] })}
                        className="mt-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground py-2 px-6 w-full max-w-[200px] hover:bg-primary/90 transition-colors"
                    >
                        Agregar al carrito
                    </button>
                )}
            </div>
        </div>
    );
}
