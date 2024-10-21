"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const ReservationNavbar = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Button
                variant="ghost"
                onClick={handleBack}
                className="text-primary"
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </CardHeader>
    );
};

export default ReservationNavbar;
