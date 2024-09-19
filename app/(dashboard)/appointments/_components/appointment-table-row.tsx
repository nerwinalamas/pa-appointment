"use client";

import Link from "next/link";
import { AppointmentProps } from "@/app/appointment/_types";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const AppointmentTableRow = ({
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
        <TableRow className="grid xl:grid-cols-7">
            <TableCell className="xl:col-span-2">
                {formattedDate} - {dayName}
            </TableCell>
            <TableCell className="xl:text-center">
                {appointment.available_slots}
            </TableCell>
            <TableCell className="xl:text-center">
                {appointment.booked_slots}
            </TableCell>
            <TableCell className="xl:text-center">
                {appointment.available_slots + appointment.booked_slots}
            </TableCell>
            <TableCell className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-center xl:col-span-2">
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

export default AppointmentTableRow;
