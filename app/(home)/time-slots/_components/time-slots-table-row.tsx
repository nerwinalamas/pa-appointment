"use client";

import { useRouter } from "next/navigation";
import { HoursTableRow } from "@/app/(dashboard)/availability/_components/availability-hours-table-row";
import { useReservation } from "@/hooks/useReservation";
import { formatTime } from "../_lib";
import { TableCell, TableRow } from "@/components/ui/table";

const TimeSlotsTableTow = ({ id, start_time, end_time }: HoursTableRow) => {
    const { setSelectedTimeSlot } = useReservation();
    const router = useRouter();

    const handleSlotSelection = (timeSlot: HoursTableRow) => {
        setSelectedTimeSlot(timeSlot);
        router.push(
            `/reservation?start=${timeSlot.start_time}&end=${timeSlot.end_time}`
        );
    };

    return (
        <TableRow
            onClick={() => handleSlotSelection({ id, start_time, end_time })}
            className="cursor-pointer hover:bg-slate-200"
        >
            <TableCell className="text-center">{formatTime(start_time)}</TableCell>
            <TableCell className="text-center">{formatTime(end_time)}</TableCell>
        </TableRow>
    );
};

export default TimeSlotsTableTow;
