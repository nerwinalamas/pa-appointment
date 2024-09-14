"use client";

import { Button } from "@/components/ui/button";
import { useSlotModal } from "@/hooks/useSlotModal";

const SlotButton = ({ appointmentId }: { appointmentId: string }) => {
    const { onOpen } = useSlotModal();

    return (
        <Button
            variant="secondary"
            onClick={() => onOpen("createSlot", appointmentId as string)}
        >
            Create Slot
        </Button>
    );
};

export default SlotButton;
