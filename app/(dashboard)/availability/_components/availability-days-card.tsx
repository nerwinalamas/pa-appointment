"use client";

import React from "react";
import { updateDays } from "../action";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

export type DaysCard = {
    id: string;
    name: string;
    is_unavailable: boolean;
};

const AvailabilityDaysCard = ({ id, name, is_unavailable }: DaysCard) => {
    const handleUpdate = async (dayId: string) => {
        try {
            const response = await updateDays(dayId);
            if (response.success) {
                console.log("Unavailable day updated successfully.");
            } else {
                toast.error("Failed to update unavailable days.");
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

export default AvailabilityDaysCard;
