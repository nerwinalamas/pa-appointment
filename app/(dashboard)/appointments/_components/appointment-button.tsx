"use client";

import { useAppointmentModal } from "@/hooks/useAppointmentModal";
import { Button } from "@/components/ui/button";

const AppointmentButton = () => {
    const { onOpen } = useAppointmentModal();

    return (
        <Button
            variant="secondary"
            onClick={() => onOpen("createAppointment")}
            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
        >
            Create
        </Button>
    );
};

export default AppointmentButton;
