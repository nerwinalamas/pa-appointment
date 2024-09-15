"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AppointmentBackButton = () => {
    const router = useRouter();
    return (
        <Button type="button" variant="secondary" onClick={() => router.back()} className="bg-slate-100 text-slate-950 hover:bg-slate-200 focus:bg-slate-200">
            Back
        </Button>
    );
};

export default AppointmentBackButton;
