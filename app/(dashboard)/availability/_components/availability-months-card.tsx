"use client";

import { updateMonths } from "../action";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

export type MonthsCard = {
    id: string;
    name: string;
    is_unavailable: boolean;
};

const AvailabilityMonthsCard = ({ id, name, is_unavailable }: MonthsCard) => {
    const handleUpdate = async (dayId: string) => {
        try {
            const response = await updateMonths(dayId);
            if (response.success) {
                console.log("Month updated successfully.");
            } else {
                toast.error("Failed to update month.");
            }
        } catch (error) {   
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Switch
                id={id}
                checked={is_unavailable}
                onCheckedChange={() => handleUpdate(id)}
            />
            <Label htmlFor={id}>{name}</Label>
        </div>
    );
};

export default AvailabilityMonthsCard;
