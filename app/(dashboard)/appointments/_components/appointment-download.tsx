"use client";

import { useState } from "react";
import { downloadData } from "../download-action";
import { months } from "../_lib/constants";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { Parser } from "json2csv";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const AppointmentDownload = () => {
    const [open, setOpen] = useState(false);
    const [checkedStates, setCheckedStates] = useState<Record<string, Checked>>(
        Object.fromEntries(months.map((month) => [month, false]))
    );

    const handleCheckedChange = (month: string) => (checked: Checked) => {
        setCheckedStates((prev) => ({ ...prev, [month]: checked }));
    };

    const handleDownload = async () => {
        const response = await downloadData();
    
        if (response.success) {
            if (Array.isArray(response.data)) {
                const json2csvParser = new Parser();
                const csv = json2csvParser.parse(response.data);
                const blob = new Blob([csv], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "data.csv";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                toast.error("No data available to download.");
            }
        } else {
            toast.error("Download failed.");
        }
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                    Download
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <div className="p-2 grid grid-cols-2 gap-3">
                    {months.map((month) => (
                        <DropdownMenuCheckboxItem
                            key={month}
                            checked={checkedStates[month]}
                            onCheckedChange={handleCheckedChange(month)}
                            onSelect={(e) => e.preventDefault()}
                            className="cursor-pointer bg-slate-100 dark:bg-slate-800 dark:text-white hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                            {month}
                        </DropdownMenuCheckboxItem>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <Button
                    variant="secondary"
                    className="w-full hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                    onClick={handleDownload}
                >
                    Download
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AppointmentDownload;
