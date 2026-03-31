"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

interface ProductGalleryProps {
    images: string[];
    name: string;
    inStock: boolean | null;
}

export default function ProductGallery({ images, name, inStock }: ProductGalleryProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const handleThumbnailClick = (index: number) => {
        if (api) {
            api.scrollTo(index);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden w-full">
                <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent className="h-full">
                        {images.map((img, i) => (
                            <CarouselItem key={i} className="h-full relative pl-0">
                                <Image
                                    src={img}
                                    alt={`${name} - ${i + 1}`}
                                    width={800}
                                    height={1000}
                                    priority={i === 0}
                                    className="object-cover w-full h-full"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {images.length > 1 && (
                        <>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black w-10 h-10" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black w-10 h-10" />
                        </>
                    )}
                </Carousel>
                {!inStock && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                        <span className="bg-black/80 px-4 py-2 text-sm tracking-widest font-semibold uppercase">Sin Stock</span>
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => handleThumbnailClick(i)}
                            className={`w-16 h-20 flex-shrink-0 bg-muted rounded overflow-hidden cursor-pointer hover:opacity-80 transition-all border-2 relative ${current === i ? "border-primary" : "border-transparent hover:border-primary/50"}`}
                        >
                            <Image src={img} alt="" width={100} height={100} className="object-cover w-full h-full" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
