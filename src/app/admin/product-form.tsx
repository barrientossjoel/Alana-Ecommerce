"use client";
import { useState } from "react";
import { updateProduct, addProduct } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Product {
    id: string;
    name: string;
    description: string | null;
    originalPrice: number | null;
    currentPrice: number;
    inStock: boolean | null;
    images: string[];
    installmentsText: string | null;
    ribbonText: string | null;
    category?: string;
}

export default function ProductForm({ product, onSuccess }: { product?: Product, onSuccess?: () => void }) {
    const isNew = !product;
    const [loading, setLoading] = useState(false);
    const [imagesRaw, setImagesRaw] = useState(product?.images?.join("\n") || "");
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploading(true);

        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append("files", e.target.files[i]);
        }

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();

            if (!res.ok || data.error) {
                toast.error(`Error al subir: ${data.error || res.statusText}`);
                return;
            }

            if (data.urls?.length) {
                setImagesRaw((prev) => {
                    const existing = prev.trim();
                    return existing ? existing + "\n" + data.urls.join("\n") : data.urls.join("\n");
                });
                toast.success(`${data.urls.length} imagen(es) subida(s)`);
            }
        } catch (err) {
            console.error("Error uploading", err);
            toast.error("Error de red al subir la imagen.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        if (isNew) {
            await addProduct(formData);
            toast.success("Producto creado exitosamente");
        } else {
            await updateProduct(product.id, formData);
            toast.success("Producto actualizado");
        }

        if (onSuccess) onSuccess();

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card p-6 border border-border rounded-md">
            <div className="flex gap-4">
                <div className="flex-[2]">
                    <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Nombre</label>
                    <Input name="name" defaultValue={product?.name || ""} required className="bg-background border-border text-foreground" />
                </div>
                <div className="flex-[1]">
                    <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Categoría *</label>
                    <select
                        name="category"
                        defaultValue={product?.category || "Básicos"}
                        required
                        className="w-full bg-background border border-border rounded-md text-foreground h-10 px-3 text-sm focus-visible:ring-1 focus-visible:ring-primary appearance-none"
                    >
                        <option value="Remeras">Remeras</option>
                        <option value="Básicos">Básicos</option>
                        <option value="Conjuntos">Conjuntos</option>
                        <option value="Abrigos">Abrigos</option>
                        <option value="Pijamas">Pijamas</option>
                        <option value="Los más vendidos">Los más vendidos</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Descripción</label>
                <textarea
                    name="description"
                    defaultValue={product?.description || ""}
                    className="w-full bg-background border border-border rounded-md text-foreground p-2 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                    rows={3}
                />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Precio Original</label>
                    <Input type="number" name="originalPrice" defaultValue={product?.originalPrice || ""} className="bg-background border-border text-foreground" />
                </div>
                <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Precio Actual *</label>
                    <Input type="number" name="currentPrice" defaultValue={product?.currentPrice || ""} required className="bg-background border-border text-foreground" />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Texto Cuotas</label>
                    <Input name="installmentsText" defaultValue={product?.installmentsText || ""} className="bg-background border-border text-foreground" />
                </div>
                <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Etiqueta (Ribbon)</label>
                    <Input name="ribbonText" defaultValue={product?.ribbonText || ""} className="bg-background border-border text-foreground" />
                </div>
            </div>
            <div>
                <div>
                    <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider font-semibold">Imágenes (Una URL por línea)</label>
                    <textarea
                        name="images"
                        value={imagesRaw}
                        onChange={(e) => setImagesRaw(e.target.value)}
                        required
                        className="w-full bg-background border border-border rounded-md text-foreground p-2 text-sm focus-visible:ring-1 focus-visible:ring-primary mb-2"
                        rows={4}
                    />
                    <div className="flex items-center gap-2">
                        <label className="bg-muted text-sm hover:bg-muted/80 cursor-pointer px-4 py-2 rounded-md transition-colors text-foreground border border-border">
                            {uploading ? "Subiendo..." : "Subir desde PC"}
                            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                        </label>
                        <span className="text-xs text-muted-foreground max-w-[250px]">O pega el link URL directo en el cuadro de texto.</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" name="inStock" defaultChecked={product ? !!product.inStock : true} id={product ? `stock-${product.id}` : "stock-new"} className="w-4 h-4 accent-primary" />
                <label htmlFor={product ? `stock-${product.id}` : "stock-new"} className="text-sm text-foreground cursor-pointer font-medium">En Stock</label>
            </div>

            <Button type="submit" disabled={loading} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest h-12">
                {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
        </form>
    );
}
