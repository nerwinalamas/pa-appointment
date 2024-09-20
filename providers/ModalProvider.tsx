"use client";

import CreateAppointment from "@/components/modals/CreateAppointment";
import UpdateAppointment from "@/components/modals/UpdateAppointment";
import DeleteAppointment from "@/components/modals/DeleteAppointment";
import CreateSlot from "@/components/modals/CreateSlot";
import UpdateSlot from "@/components/modals/UpdateSlot";
import DeleteSlot from "@/components/modals/DeleteSlot";
import AddStaff from "@/components/modals/AddStaff";
import UpdateStaff from "@/components/modals/UpdateStaff";
import DeleteStaff from "@/components/modals/DeleteStaff";

const ModalProvider = () => {
    return (
        <>
            <CreateAppointment />
            <UpdateAppointment />
            <DeleteAppointment />

            <CreateSlot />
            <UpdateSlot />
            <DeleteSlot />

            <AddStaff />
            <UpdateStaff />
            <DeleteStaff />
        </>
    );
};

export default ModalProvider;
