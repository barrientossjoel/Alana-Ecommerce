"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const password = data.get("password") as string;
        const confirm = data.get("confirm") as string;

        if (password !== confirm) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.get("name"),
                email: data.get("email"),
                password,
            }),
        });

        const result = await res.json();
        setLoading(false);

        if (!res.ok) {
            toast.error(result.error || "Error al crear la cuenta.");
        } else {
            toast.success("¡Cuenta creada! Podés iniciar sesión.");
            router.push("/login");
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8 gap-3">
                    <Link href="/">
                        <Image src="/Icon.png" alt="Alana" width={56} height={56} className="drop-shadow-sm" />
                    </Link>
                    <span
                        className="text-3xl tracking-normal text-foreground"
                        style={{ fontFamily: "var(--font-script)" }}
                    >
                        Alana
                    </span>
                </div>

                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <h1 className="text-xl font-semibold text-foreground mb-6 text-center tracking-wide">
                        Crear cuenta
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                                Nombre
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Tu nombre"
                                required
                                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                                Mail
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="m@ejemplo.com"
                                required
                                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                                Contraseña
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                required
                                minLength={6}
                                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                                Confirmar Contraseña
                            </label>
                            <input
                                name="confirm"
                                type="password"
                                required
                                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 h-11 w-full bg-primary text-primary-foreground rounded-md text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60"
                        >
                            {loading ? "Creando cuenta..." : "Crear Cuenta"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        ¿Ya tenés una cuenta?{" "}
                        <Link href="/login" className="text-primary font-semibold hover:underline">
                            Iniciá sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
