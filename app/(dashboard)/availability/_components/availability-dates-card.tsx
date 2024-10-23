"use client";

import { deleteUnavailableDate } from "../action";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export type DatesCard = {
    id: string;
    date: string;
};

const AvailabilityDatesCard = ({ id, date }: DatesCard) => {
    const handleDelete = async (unavailableDateId: string) => {
        try {
            const response = await deleteUnavailableDate(unavailableDateId);
            if (response.success) {
                console.log("Unavailable date deleted successfully.");
            } else {
                toast.error("Failed to delete unavailable date.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="w-max flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
            <span>{format(date, "MMM dd, yyyy")}</span>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(id)}
                title={`Delete ${format(date, "MMM dd, yyyy")}`}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default AvailabilityDatesCard;
