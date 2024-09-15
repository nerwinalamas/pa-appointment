import Link from "next/link";
import Logout from "@/app/(auth)/logout/page";
import ToggleThemeButton from "@/components/shared/toggle-theme-button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = ["Home", "Appointments", "Account"];

const Navbar = () => {
    return (
        <nav className="p-4 flex items-center justify-between lg:px-20">
            <Link href="/appointment">
                <h1 className="text-xl font-semibold">Logo</h1>
            </Link>

            <div className="flex items-center gap-5 lg:hidden">
                <ToggleThemeButton />
                <Sheet>
                    <SheetTrigger>
                        <Menu />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Logo</SheetTitle>
                        </SheetHeader>
                        <div className="my-5 flex flex-col items-center justify-start gap-2 text-slate-900 dark:text-slate-50">
                            {navItems.map((item) => (
                                <Link
                                    href="/"
                                    key={item}
                                    className="w-full p-2"
                                >
                                    {item}
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
