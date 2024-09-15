"use client";

import CreateAppointment from "@/components/modals/CreateAppointment";
import DeleteAppointment from "@/components/modals/DeleteAppointment";
import UpdateAppointment from "@/components/modals/UpdateAppointment";
import CreateSlot from "@/components/modals/CreateSlot";
import DeleteSlot from "@/components/modals/DeleteSlot";
import UpdateSlot from "@/components/modals/UpdateSlot";

const ModalProvider = () => {
    return (
        <>
            <CreateAppointment />
            <UpdateAppointment />
            <DeleteAppointment />
            <CreateSlot />
            <UpdateSlot />
            <DeleteSlot />
        </>
    );
};

export default ModalProvider;
