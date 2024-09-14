"use client";

import { useThemeStore } from "@/hooks/useTheme";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
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
        <Button variant="secondary" onClick={toggleTheme}>
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
};

export default ToggleThemeButton;
