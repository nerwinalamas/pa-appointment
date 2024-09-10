"use client";

import CreateAppointment from "@/components/modals/CreateAppointment";
import CreateSlot from "@/components/modals/CreateSlot";
import UpdateAppointment from "@/components/modals/UpdateAppointment";
import UpdateSlot from "@/components/modals/UpdateSlot";

const ModalProvider = () => {
    return (
        <>
            <CreateAppointment />
            <UpdateAppointment />
            <CreateSlot />
            <UpdateSlot />
        </>
    );
};

export default ModalProvider;
