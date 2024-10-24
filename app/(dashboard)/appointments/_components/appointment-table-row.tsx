"use client";

import Link from "next/link";
import { formatTime } from "@/app/(home)/time-slots/_lib";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";
import { AppointmentProps } from "../_types";
import { formatDate } from "../_lib";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";

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
        <TableRow className="grid xl:grid-cols-12">
            <TableCell className="xl:col-span-3">
                {formattedDate} - {dayName}
            </TableCell>
            <TableCell className="xl:text-center xl:col-span-2">
                {formatTime(timeSlots.start_time)} -{" "}
                {formatTime(timeSlots.end_time)}
            </TableCell>
            <TableCell className="capitalize xl:text-center xl:col-span-2">
                {appointment.name}
            </TableCell>
            <TableCell className="xl:text-center xl:col-span-2">
                {appointment.contact_number}
            </TableCell>
            <TableCell className="xl:flex xl:items-start xl:justify-center">
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
