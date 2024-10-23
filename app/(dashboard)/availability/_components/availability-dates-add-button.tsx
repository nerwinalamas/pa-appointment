"use client";

import { useUnavailableDateModal } from "@/hooks/useUnavailableDateModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AvailabilityDatesAddButton = () => {
    const { onOpen } = useUnavailableDateModal();

    return (
        <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute top-6 right-6"
            title="Add unavailable date"
            onClick={() => onOpen("createUnavailableDate")}
        >
            <Plus />
        </Button>
    );
};

export default AvailabilityDatesAddButton;
