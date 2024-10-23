"use client";

import { useTimeSlotModal } from "@/hooks/useTimeSlotModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AvailabilityHoursAddButton = () => {
    const { onOpen } = useTimeSlotModal();

    return (
        <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute top-6 right-6"
            title="Add time slot"
            onClick={() => onOpen("createTimeSlot")}
        >
            <Plus />
        </Button>
    );
};

export default AvailabilityHoursAddButton;
