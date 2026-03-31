"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm, { Product } from "./product-form";
import { useRouter } from "next/navigation";



export default function AdminDashboardClient({ initialProducts }: { initialProducts: Product[] }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedProduct(undefined);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        router.refresh();
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-medium tracking-wide mb-2 text-foreground">Panel de Administración</h1>
                    <p className="text-muted-foreground text-sm">Administra los productos, imágenes y precios.</p>
                </div>
                <Button
                    onClick={handleAddNew}
                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                >
                    + Añadir Producto
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {/* Tarjeta de Agregar Nuevo Producto */}
                <button
                    onClick={handleAddNew}
                    className="group flex flex-col items-center justify-center bg-transparent border-2 border-dashed border-border hover:border-primary rounded-xl min-h-[300px] transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                >
                    <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-4xl font-light leading-none">+</span>
                    </div>
                    <span className="text-lg font-medium tracking-wide">Agregar Producto</span>
                </button>

                {initialProducts.map((p) => {
                    const images = p.images as string[];
                    const coverImage = images.length > 0 ? images[0] : null;

                    return (
                        <div key={p.id} className="flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-colors shadow-sm">
                            <div className="aspect-square bg-muted w-full relative">
                                {coverImage ? (
                                    <img src={coverImage} alt={p.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sin Imagen</div>
                                )}
                            </div>
                            <div className="p-4 flex flex-col gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold leading-tight line-clamp-2 text-foreground" title={p.name}>{p.name}</h2>
                                    <p className="text-muted-foreground text-xs mt-1">ID: {p.id}</p>
                                </div>
                                <Button
                                    onClick={() => handleEdit(p)}
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    Editar
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedProduct ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
                    </DialogHeader>
                    <ProductForm
                        product={selectedProduct}
                        onSuccess={handleSuccess}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
