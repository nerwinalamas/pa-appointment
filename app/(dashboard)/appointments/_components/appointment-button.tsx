"use client";

import { Button } from "@/components/ui/button";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

const AppointmentButton = () => {
    const { onOpen } = useAppointmentModal();
    
    return <Button onClick={() => onOpen("createAppointment")}>Create</Button>;
};

export default AppointmentButton;
