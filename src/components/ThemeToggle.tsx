"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <button
            onClick={() => {
                if (mounted) setTheme(theme === "light" ? "dark" : "light");
            }}
            className="hover:text-primary transition-colors p-1"
            aria-label="Toggle theme"
            suppressHydrationWarning
        >
            <span suppressHydrationWarning>
                {mounted && theme === "dark"
                    ? <Sun className="w-4 h-4" />
                    : <Moon className="w-4 h-4" />}
            </span>
        </button>
    );
}
