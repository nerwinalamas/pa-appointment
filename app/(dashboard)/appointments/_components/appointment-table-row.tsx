"use client";

import Link from "next/link";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";
import { AppointmentProps } from "../_types";
import { formatDate } from "@/app/appointment/_lib/utils";

const AppointmentTableRow = ({
    appointment,
}: {
    appointment: AppointmentProps;
}) => {
    const { onOpen } = useAppointmentModal();
    const { dayName, formattedDate } = formatDate(appointment.date);
    const timeSlots = appointment.time_slots
        ? JSON.parse(appointment.time_slots)
        : "";

    return (
        <TableRow className="grid xl:grid-cols-11">
            <TableCell className="xl:col-span-2">
                {formattedDate} - {dayName}
            </TableCell>
            <TableCell className="xl:text-center xl:col-span-2">
                {timeSlots.start} to {timeSlots.end}
            </TableCell>
            <TableCell className="capitalize xl:text-center xl:col-span-2">
                {appointment.name}
            </TableCell>
            <TableCell className="xl:text-center xl:col-span-2">
                {appointment.contact_number}
            </TableCell>
            <TableCell className="flex items-start justify-center">
                {appointment.deposit_screenshots && (
                    <Link
                        href={appointment.deposit_screenshots}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FileCheck className="h-5 w-5 text-green-500" />
                    </Link>
                )}
            </TableCell>
            <TableCell className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-center xl:col-span-2">
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
