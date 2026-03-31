import { db } from "@/db";
import { products } from "@/db/schema";
import AdminDashboardClient from "./AdminDashboardClient";
import { Product } from "./product-form";

export const revalidate = 0;

export default async function AdminPage() {
    const allProducts = await db.select().from(products);

    // Map DB products to Product interface expected by client component
    const mappedProducts: Product[] = allProducts.map(p => ({
        ...p,
        images: p.images as string[]
    }));

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <AdminDashboardClient initialProducts={mappedProducts} />
        </div>
    );
}
