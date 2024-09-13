import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const navItems = ["Home", "Appointments", "Dark mode", "Account"];

// TODO: NOT FINAL
// NAVBAR SA DASHBOARD
// LIGHT/DARK MODE
const Navbar = () => {
    return (
        <nav className="p-4 flex items-center justify-between lg:px-20">
            <Link href="/">
                <h1 className="text-xl font-semibold">Logo</h1>
            </Link>

            <Sheet>
                <SheetTrigger>
                    <Menu className="lg:hidden" />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Logo</SheetTitle>
                    </SheetHeader>
                    <div className="h-full mt-5 flex flex-col items-center justify-start gap-2">
                        {navItems.map((item) => (
                            <Link href="/" key={item}>
                                {item}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            <div className="hidden lg:flex lg:items-center lg:gap-2">
                {navItems.map((item) => (
                    <Link href="/" key={item} className="p-2">
                        {item}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
