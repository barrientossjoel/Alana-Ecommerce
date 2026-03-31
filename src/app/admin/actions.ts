"use server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const originalPriceStr = formData.get("originalPrice") as string;
    const currentPriceStr = formData.get("currentPrice") as string;
    const inStock = formData.get("inStock") === "on";
    const imagesRaw = formData.get("images") as string;
    const installmentsText = formData.get("installmentsText") as string;
    const ribbonText = formData.get("ribbonText") as string;
    const category = formData.get("category") as string || "Básicos";

    const images = imagesRaw.split("\n").map(s => s.trim()).filter(Boolean);
    const originalPrice = originalPriceStr ? Number(originalPriceStr) : null;
    const currentPrice = currentPriceStr ? Number(currentPriceStr) : 0;

    await db.update(products).set({
        name,
        description,
        originalPrice,
        currentPrice,
        installmentsText,
        ribbonText,
        inStock,
        images,
        category
    }).where(eq(products.id, id));

    revalidatePath("/");
    revalidatePath("/productos");
    revalidatePath("/admin");
}

export async function addProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const currentPrice = Number(formData.get("currentPrice") || 0);
    const inStock = formData.get("inStock") === "on";
    const imagesRaw = formData.get("images") as string;
    const category = formData.get("category") as string || "Básicos";
    const images = imagesRaw.split("\n").map(s => s.trim()).filter(Boolean);

    await db.insert(products).values({
        id: `prod_${Date.now()}`,
        name,
        description,
        currentPrice,
        inStock,
        images,
        category
    });

    revalidatePath("/");
    revalidatePath("/productos");
    revalidatePath("/admin");
}
