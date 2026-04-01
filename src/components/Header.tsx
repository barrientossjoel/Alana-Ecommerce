import { Search } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";
import CartIndicator from "./CartIndicator";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <>
            <header className="w-full relative z-40">
                {/* Top Banner */}
                <div className="bg-primary text-primary-foreground text-[11px] uppercase tracking-wider py-2 px-4 flex flex-col sm:flex-row justify-between items-center z-50 relative">
                    <div className="flex-1 text-center font-medium">
                        Todo lo que buscas, en un mismo lugar 🖤 3 CUOTAS SIN INTERES // 25% OFF EN EFECTIVO O TRANSFERENCIA
                    </div>
                    <div className="hidden lg:flex gap-4 text-primary-foreground/80 mt-2 sm:mt-0 text-xs font-medium">
                        <span className="flex items-center gap-1">📞 1123214152</span>
                        <span className="flex items-center gap-1">✉ vitatiendao@gmail.com</span>
                        <span className="flex items-center gap-1">📍 wilde</span>
                    </div>
                </div>

                {/* Main Header */}
                <div className="bg-card py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border shadow-sm">
                    {/* Logo */}
                    <div className="flex-1 flex justify-start items-center">
                        <Link href="/" className="flex items-center justify-center gap-4">
                            <img
                                src="/Icon.png"
                                alt="Alana Logo"
                                className="h-16 md:h-20 w-auto cursor-pointer hover:opacity-80 transition-opacity drop-shadow-sm"
                            />
                            <span
                                className="text-4xl md:text-5xl tracking-normal text-foreground pt-1 pr-2"
                                style={{ fontFamily: "var(--font-script)" }}
                            >
                                Alana
                            </span>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="flex-1 w-full max-w-sm flex justify-center items-center">
                        <div className="flex w-full shadow-sm">
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="rounded-none bg-background border-border text-sm text-foreground focus-visible:ring-0 focus-visible:border-primary h-10 w-full"
                            />
                            <button className="bg-primary h-10 px-4 flex items-center justify-center hover:bg-primary/90 transition-colors">
                                <Search className="w-4 h-4 text-primary-foreground" suppressHydrationWarning />
                            </button>
                        </div>
                    </div>

                    {/* Auth & Theme */}
                    <div className="hidden md:flex flex-1 justify-end items-center gap-4 text-xs font-semibold tracking-widest text-muted-foreground">
                        <ThemeToggle />
                        <span className="text-border">|</span>
                        <Link href="/register" className="hover:text-foreground transition-colors">CREAR CUENTA</Link>
                        <span className="text-border">|</span>
                        <Link href="/login" className="hover:text-foreground transition-colors">INICIAR SESIÓN</Link>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="sticky top-0 z-40 bg-background border-b border-border py-4 px-8 text-[11px] font-semibold tracking-[0.15em] text-muted-foreground flex justify-center items-center gap-8 shadow-sm">
                <Link href="/" className="hover:text-foreground transition-colors">INICIO</Link>
                <Link href="/productos" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    PRODUCTOS
                    <span className="text-[9px]">▼</span>
                </Link>
                <Link href="/contacto" className="hidden md:block hover:text-foreground transition-colors">CONTACTO</Link>
                <CartIndicator />
                <MobileMenu />
            </nav>
        </>
    );
}
