"use client";

import { downloadData } from "../download-action";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Parser } from "json2csv";

const AppointmentDownload = () => {
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
                toast.success("Data downloaded succesfully.");
            } else {
                toast.error("No data available to download.");
            }
        } else {
            toast.error("Download failed.");
        }
    };

    return (
        <Button
            variant="secondary"
            onClick={handleDownload}
            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
        >
            Download
        </Button>
    );
};

export default AppointmentDownload;
