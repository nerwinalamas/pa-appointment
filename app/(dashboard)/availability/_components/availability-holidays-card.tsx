"use client";

import { deleteHoliday } from "../action";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export type HolidaysCard = {
    id: string;
    date: string;
    name: string;
};

const AvailabilityHolidaysCard = ({ id, date, name }: HolidaysCard) => {
    const handleDelete = async (unavailableDateId: string) => {
        try {
            const response = await deleteHoliday(unavailableDateId);
            if (response.success) {
                console.log("holiday deleted successfully.");
            } else {
                toast.error("Failed to delete holiday.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="w-max flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 rounded-md p-2">
            <span>
                {format(date, "MMM d, yyyy")} - {name}
            </span>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(id)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default AvailabilityHolidaysCard;
