import { db } from "./index";
import { products } from "./schema";

const initialProducts = [
    {
        id: "prod_n1",
        name: "ART122",
        description: "Conjunto lencería clásico de encaje.",
        originalPrice: 21334.00,
        currentPrice: 13334.00,
        installmentsText: "3 cuotas sin interés de $4.444,67",
        ribbonText: "37% OFF",
        inStock: false,
        images: ["https://images.unsplash.com/photo-1582214643034-7086dfbea1e7?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "prod_n2",
        name: "ART4015",
        description: "Conjunto lencería diseño floral.",
        originalPrice: 22667.00,
        currentPrice: 16000.00,
        installmentsText: "3 cuotas sin interés de $5.333,33",
        ribbonText: "29% OFF",
        inStock: true,
        images: ["https://images.unsplash.com/photo-1582214643034-7086dfbea1e7?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "prod_n3",
        name: "ART722 RNB",
        description: "Conjunto deportivo RNB.",
        originalPrice: 20000.00,
        currentPrice: 13334.00,
        installmentsText: "3 cuotas sin interés de $4.444,67",
        ribbonText: "33% OFF",
        inStock: true,
        images: ["https://images.unsplash.com/photo-1582214643034-7086dfbea1e7?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "prod_n4",
        name: "ART722 NBV",
        description: "Conjunto deportivo NBV.",
        originalPrice: 20000.00,
        currentPrice: 13334.00,
        installmentsText: "3 cuotas sin interés de $4.444,67",
        ribbonText: "33% OFF",
        inStock: false,
        images: ["https://images.unsplash.com/photo-1582214643034-7086dfbea1e7?w=500&auto=format&fit=crop&q=60"]
    }
];

async function main() {
    console.log("Seeding database...");
    await db.insert(products).values(initialProducts).onConflictDoNothing();
    console.log("Seeding done!");
    process.exit(0);
}

main().catch((err) => {
    console.error("Error seeding:", err);
    process.exit(1);
});
