"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const TimeSlotsBackButton = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <Button variant="ghost" onClick={handleBack} className="mt-4 mx-4 text-primary">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
    );
};

export default TimeSlotsBackButton;
