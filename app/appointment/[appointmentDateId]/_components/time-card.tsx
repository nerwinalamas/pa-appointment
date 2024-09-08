"use client";

import { useParams } from "next/navigation";
import { formatTime } from "../_lib/utils";
import { Slot } from "../_types";
import Link from "next/link";

const TimeCard = ({ id, start_time, end_time, is_booked }: Slot) => {
    const params = useParams();

    const formattedStartTime = formatTime(start_time);
    const formattedEndTime = formatTime(end_time);

    if (is_booked) {
        return (
            <div className="flex items-center justify-center h-40 p-4 rounded-lg cursor-not-allowed bg-red-400 text-slate-800">
                <div className="text-xl font-bold">
                    {formattedStartTime} - {formattedEndTime}
                </div>
            </div>
        );
    }

    return (
        <Link
            href={`/appointment/${params.appointmentDateId}/${id}`}
            className="flex items-center justify-center h-40 p-4 rounded-lg bg-green-400 text-slate-800"
        >
            <div className="text-xl font-bold">
                {formattedStartTime} - {formattedEndTime}
            </div>
        </Link>
    );
};

export default TimeCard;
