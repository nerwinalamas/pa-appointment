"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteTimeSlot } from "../action";

export type HoursTableRow = {
    id: string;
    start_time: string;
    end_time: string;
};

const AvailabilityHoursTableRow = ({
    id,
    start_time,
    end_time,
}: HoursTableRow) => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    useEffect(() => {
        setStart(start_time);
        setEnd(end_time);
    }, [start_time, end_time]);

    const handleDelete = async (timeSlotId: string) => {
        try {
            const response = await deleteTimeSlot(timeSlotId);
            if (response.success) {
                console.log("time slot deleted successfully.");
            } else {
                toast.error("Failed to delete time slot.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <TableRow>
            <TableCell>
                <Input
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    readOnly
                />
            </TableCell>
            <TableCell>
                <Input
                    type="time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    readOnly
                />
            </TableCell>
            <TableCell className="flex items-center justify-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(id as string)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default AvailabilityHoursTableRow;
