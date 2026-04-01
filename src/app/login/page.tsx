"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.currentTarget);

        const result = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            toast.error("Email o contraseña incorrectos.");
        } else {
            router.push("/");
            router.refresh();
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        await signIn("google", { callbackUrl: "/" });
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
                        Bienvenida de nuevo
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                                required
                                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 h-11 w-full bg-primary text-primary-foreground rounded-md text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60"
                        >
                            {loading ? "Iniciando..." : "Iniciar Sesión"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground">O continuar con</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Google */}
                    <button
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full h-11 flex items-center justify-center gap-3 border border-border rounded-md bg-background hover:bg-muted transition-colors text-sm font-medium text-foreground disabled:opacity-60"
                    >
                        <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                            <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 35 24 35a12 12 0 1 1 0-24c3.1 0 5.8 1.1 7.9 3l5.7-5.7A19.9 19.9 0 0 0 24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z" fill="#FFC107" />
                            <path d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7A19.9 19.9 0 0 0 24 4a20 20 0 0 0-17.7 10.7z" fill="#FF3D00" />
                            <path d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2A12 12 0 0 1 12 27.7L5.3 33a20 20 0 0 0 18.7 11z" fill="#4CAF50" />
                            <path d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.5l6.2 5.2C37 39 44 34 44 24c0-1.2-.1-2.3-.4-3.5z" fill="#1976D2" />
                        </svg>
                        {googleLoading ? "Redirigiendo..." : "Google"}
                    </button>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        ¿No tenés una cuenta?{" "}
                        <Link href="/register" className="text-primary font-semibold hover:underline">
                            Registrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
