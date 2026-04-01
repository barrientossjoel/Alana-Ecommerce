import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son requeridos." }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
        }

        const existing = await db.select().from(users).where(eq(users.email, email)).get();
        if (existing) {
            return NextResponse.json({ error: "Ya existe una cuenta con ese email." }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await db.insert(users).values({
            id: `user_${Date.now()}`,
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Error al crear la cuenta." }, { status: 500 });
    }
}
