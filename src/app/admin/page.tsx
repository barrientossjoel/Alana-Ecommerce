import { db } from "@/db";
import { products } from "@/db/schema";
import AdminDashboardClient from "./AdminDashboardClient";
import { Product } from "./product-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function AdminPage() {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    if ((session.user as { role?: string })?.role !== "admin") {
        redirect("/");
    }

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
