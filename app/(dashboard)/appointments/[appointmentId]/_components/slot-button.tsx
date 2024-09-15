"use client";

import { useSlotModal } from "@/hooks/useSlotModal";
import { Button } from "@/components/ui/button";

const SlotButton = ({ appointmentId }: { appointmentId: string }) => {
    const { onOpen } = useSlotModal();

    return (
        <Button
            variant="secondary"
            onClick={() => onOpen("createSlot", appointmentId as string)}
            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
        >
            Create Slot
        </Button>
    );
};

export default SlotButton;
