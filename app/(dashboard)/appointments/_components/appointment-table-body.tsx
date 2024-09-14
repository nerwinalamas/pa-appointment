"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";
import { AppointmentProps } from "@/app/appointment/_types";
import { deleteAppointment } from "../action";

const AppointmentTableBody = ({
    appointment,
    formattedDate,
    dayName,
}: {
    appointment: AppointmentProps;
    formattedDate: string;
    dayName: string;
}) => {
    const { onOpen } = useAppointmentModal();

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteAppointment(id);
            if (response.success) {
                toast.success("Delete appointment successfull");
            }
        } catch (error) {
            console.log("Error deleting appointment");
        }
    };

    return (
        <TableRow className="grid lg:grid-cols-7">
            <TableCell className="lg:col-span-2">
                {formattedDate} - {dayName}
            </TableCell>
            <TableCell className="lg:text-center">
                {appointment.available_slots}
            </TableCell>
            <TableCell className="lg:text-center">
                {appointment.booked_slots}
            </TableCell>
            <TableCell className="lg:text-center">
                {appointment.available_slots + appointment.booked_slots}
            </TableCell>
            <TableCell className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center lg:col-span-2">
                <Link href={`/appointments/${appointment.id}`}>
                    <Button variant="secondary" className="w-full">
                        Read
                    </Button>
                </Link>
                <Button
                    variant="secondary"
                    onClick={() => onOpen("updateAppointment", appointment)}
                >
                    Update
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => handleDelete(appointment.id)}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default AppointmentTableBody;
