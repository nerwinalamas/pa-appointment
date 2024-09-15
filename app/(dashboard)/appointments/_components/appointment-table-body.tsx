"use client";

import Link from "next/link";
import { AppointmentProps } from "@/app/appointment/_types";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
                    <Button variant="secondary" className="w-full hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700">
                        Read
                    </Button>
                </Link>
                <Button
                    variant="secondary"
                    onClick={() => onOpen("updateAppointment", appointment)}
                    className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                    Update
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onOpen("deleteAppointment", appointment)}
                    className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default AppointmentTableBody;
