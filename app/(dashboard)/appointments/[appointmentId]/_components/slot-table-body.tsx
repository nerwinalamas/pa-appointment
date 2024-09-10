"use client";

import { Slot } from "@/app/appointment/[appointmentDateId]/_types";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useSlotModal } from "@/hooks/useSlotModal";
import { deleteSlot } from "../action";
import toast from "react-hot-toast";
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

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteSlot(id);
            if (response.success) {
                toast.success("Delete appointment successfull");
            }
        } catch (error) {
            console.log("Error deleting appointment");
        }
    };

    return (
        <TableRow>
            <TableCell className="text-center">{formattedStartTime}</TableCell>
            <TableCell className="text-center">{formattedEndTime}</TableCell>
            <TableCell className="text-center">
                {slot.is_booked ? "Booked" : "Available"}
            </TableCell>
            <TableCell className="text-center">{slot.name || "-"}</TableCell>
            <TableCell className="text-center">
                {slot.contact_number || "-"}
            </TableCell>
            <TableCell className="text-center">
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
            <TableCell className="flex items-center justify-center gap-2">
                <Button onClick={() => onOpen("updateSlot", slot)}>
                    Update
                </Button>
                <Button onClick={() => handleDelete(slot.id)}>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

export default SlotTableBody;
