"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "@/app/(auth)/logout/page";
import { SIDEBAR_ITEMS } from "../_lib/constants";
import ToggleThemeButton from "@/components/shared/toggle-theme-button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
    const [openSheet, setOpenSheet] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="p-4 flex items-center justify-between bg-slate-100 dark:bg-slate-950">
            <div></div>

            <div className="flex items-center gap-5 lg:hidden">
                <ToggleThemeButton />
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <SheetTrigger>
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="left" aria-describedby={undefined}>
                        <SheetHeader>
                            <SheetTitle>Logo</SheetTitle>
                        </SheetHeader>
                        <div className="my-5 flex flex-col items-center justify-start gap-2 text-slate-900 dark:text-slate-50">
                            {SIDEBAR_ITEMS.map((item) => (
                                <Link
                                    href={item.url}
                                    key={item.id}
                                    className={`w-full p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 ${
                                        pathname === `/${item.name.toLowerCase()}`
                                            ? "bg-slate-200 dark:bg-slate-700"
                                            : ""
                                    }`}
                                    onClick={() => setOpenSheet(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <Logout />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-2">
                <ToggleThemeButton />
                <Logout />
            </div>
        </nav>
    );
};

export default Navbar;
