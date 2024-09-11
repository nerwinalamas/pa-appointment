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
        <TableRow>
            <TableCell>
                {formattedDate} - {dayName}
            </TableCell>
            <TableCell className="text-center">
                {appointment.available_slots}
            </TableCell>
            <TableCell className="text-center">
                {appointment.booked_slots}
            </TableCell>
            <TableCell className="text-center">
                {appointment.available_slots + appointment.booked_slots}
            </TableCell>
            <TableCell className="flex items-center justify-center gap-2">
                <Link href={`/appointments/${appointment.id}`}>
                    <Button>Read</Button>
                </Link>
                <Button
                    onClick={() => onOpen("updateAppointment", appointment)}
                >
                    Update
                </Button>
                <Button onClick={() => handleDelete(appointment.id)}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default AppointmentTableBody;
