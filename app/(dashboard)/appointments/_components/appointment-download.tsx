"use client";

import { Button } from "@/components/ui/button";
import { downloadAppointments } from "../download-action";

// TODO: NOT FINAL
const AppointmentDownload = () => {
    const handleDownload = async () => {
        const response = await downloadAppointments();
        if (response.success) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "appointments.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } else {
            console.error(response.error);
        }
    };

    return (
        <Button variant="secondary" onClick={handleDownload}>
            Download
        </Button>
    );
};

export default AppointmentDownload;
