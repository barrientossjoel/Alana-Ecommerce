import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: integer("email_verified", { mode: "timestamp" }),
    image: text("image"),
    password: text("password"),
    role: text("role").notNull().default("user"), // "user" | "admin"
});

export const products = sqliteTable("products", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    originalPrice: real("original_price"),
    currentPrice: real("current_price").notNull(),
    installmentsText: text("installments_text"),
    ribbonText: text("ribbon_text"),
    inStock: integer("in_stock", { mode: "boolean" }).default(true),
    images: text("images", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
    category: text("category").notNull().default("Básicos"),
});

export const orders = sqliteTable("orders", {
    id: text("id").primaryKey(),
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),
    status: text("status").notNull(), // "pending", "paid", "cancelled"
    total: real("total").notNull(),
    paymentMethod: text("payment_method").notNull(), // "mercado_pago", "cash"
    preferenceId: text("preference_id"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now'))`)
});

export const orderItems = sqliteTable("order_items", {
    id: text("id").primaryKey(),
    orderId: text("order_id").references(() => orders.id).notNull(),
    productId: text("product_id").references(() => products.id).notNull(),
    productName: text("product_name").notNull(),
    price: real("price").notNull(),
    quantity: integer("quantity").notNull(),
});
