"use client";

import { useTheme } from "next-themes";
import { useThemeStore } from "@/hooks/useTheme";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ToggleThemeButton = () => {
    const { setTheme } = useTheme();
    const { theme, setTheme: setStoreTheme } = useThemeStore();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setStoreTheme(newTheme);
    };

    return (
        <Button variant="secondary" onClick={toggleTheme} className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700">
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
};

export default ToggleThemeButton;
