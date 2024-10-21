"use client";

import CreateAppointment from "@/components/modals/CreateAppointment";
import UpdateAppointment from "@/components/modals/UpdateAppointment";
import DeleteAppointment from "@/components/modals/DeleteAppointment";
import AddStaff from "@/components/modals/AddStaff";
import UpdateStaff from "@/components/modals/UpdateStaff";
import DeleteStaff from "@/components/modals/DeleteStaff";
import DeleteAccount from "@/components/modals/DeleteAccount";

const ModalProvider = () => {
    return (
        <>
            <CreateAppointment />
            <UpdateAppointment />
            <DeleteAppointment />

            <AddStaff />
            <UpdateStaff />
            <DeleteStaff />

            <DeleteAccount />
        </>
    );
};

export default ModalProvider;
