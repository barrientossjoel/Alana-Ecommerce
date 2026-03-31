"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    // Todo: Real Auth integration
    const isLoggedIn = false;

    return (
        <div className="md:hidden ml-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-card border-b border-border shadow-2xl flex flex-col p-6 gap-4 z-50">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Tema</span>
                        <ThemeToggle />
                    </div>
                    <Link
                        href="/contacto"
                        onClick={() => setIsOpen(false)}
                        className="text-foreground font-medium text-sm tracking-wider uppercase border-b border-border pb-4"
                    >
                        Contacto
                    </Link>

                    {isLoggedIn ? (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-left text-red-400 font-medium text-sm tracking-wider uppercase pt-2"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground font-medium text-sm tracking-wider uppercase"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground font-medium text-sm tracking-wider uppercase pt-2"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
