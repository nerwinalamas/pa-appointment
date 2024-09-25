"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { items } from "../_lib/constants";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="hidden xl:w-60 xl:h-screen xl:p-4 xl:flex xl:flex-col xl:gap-5 bg-slate-100 dark:bg-slate-950">
            <Link href="/appointment" className="p-2">
                <h1 className="text-xl text-center font-semibold">Logo</h1>
            </Link>
            <div className="flex flex-col gap-3">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={item.url}
                        className={`p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 ${
                            pathname === `/${item.name.toLowerCase()}`
                                ? "bg-slate-200 dark:bg-slate-700"
                                : ""
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
