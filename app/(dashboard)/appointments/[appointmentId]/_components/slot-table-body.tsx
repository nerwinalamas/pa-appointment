"use client";

import { Slot } from "@/app/appointment/[appointmentDateId]/_types";
import { useSlotModal } from "@/hooks/useSlotModal";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const SlotTableBody = ({
    slot,
    formattedStartTime,
    formattedEndTime,
}: {
    slot: Slot;
    formattedStartTime: string;
    formattedEndTime: string;
}) => {
    const { onOpen } = useSlotModal();

    return (
        <TableRow className="grid lg:grid-cols-10">
            <TableCell className="lg:text-center">
                {formattedStartTime}
            </TableCell>
            <TableCell className="lg:text-center">{formattedEndTime}</TableCell>
            <TableCell className="lg:text-center">
                {slot.is_booked ? "Booked" : "Available"}
            </TableCell>
            <TableCell className="lg:text-center lg:col-span-2">
                {slot.name || "-"}
            </TableCell>
            <TableCell className="lg:text-center lg:col-span-2 ">
                {slot.contact_number || "-"}
            </TableCell>
            <TableCell className="lg:text-center">
                {slot.deposit_screenshot ? (
                    <a
                        href={slot.deposit_screenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink size={18} className="mx-auto" />
                    </a>
                ) : (
                    "-"
                )}
            </TableCell>
            <TableCell className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center lg:col-span-2">
                <Button
                    variant="secondary"
                    onClick={() => onOpen("updateSlot", slot)}
                    className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                    Update
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onOpen("deleteSlot", slot)}
                    className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default SlotTableBody;
