import { FormEvent, useEffect, useState } from "react";
import { updateSlot } from "@/app/(dashboard)/appointments/[appointmentId]/action";
import { ErrorState } from "@/app/(dashboard)/appointments/[appointmentId]/_lib/type";
import { slotSchema } from "@/app/(dashboard)/appointments/[appointmentId]/_lib/schema";
import { formatTime } from "@/app/appointment/[appointmentDateId]/_lib/utils";
import { useSlotModal } from "@/hooks/useSlotModal";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const UpdateSlot = () => {
    const { isOpen, onClose, type, data } = useSlotModal();
    const isModalOpen = isOpen && type === "updateSlot";

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState<ErrorState>({});

    const handleDialogChange = () => {
        if (data && typeof data === "object") {
            setStartTime(formatTime(data.start_time));
            setEndTime(formatTime(data.end_time));
        }
        setError({});
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError({});

        const result = slotSchema.safeParse({ startTime, endTime });

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            type ErrorKeys = keyof typeof formattedErrors;
            setError(
                Object.keys(formattedErrors).reduce((acc, key) => {
                    const typedKey = key as ErrorKeys;
                    acc[typedKey] = formattedErrors[typedKey]?.[0] || "";
                    return acc;
                }, {} as ErrorState)
            );
            return;
        }

        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        if (end <= start) {
            setError({
                endTime: "End time must be after start time",
            });
            return;
        }

        if (!data || typeof data !== "object") return;

        try {
            const formData = new FormData();
            formData.append("startTime", startTime);
            formData.append("endTime", endTime);

            const response = await updateSlot(
                data.id,
                data.appointment_id,
                formData
            );
            if (response.success) {
                toast.success("Update slot successfully");
                onClose();
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error creating slot: ", error);
        }
    };

    useEffect(() => {
        if (data && typeof data === "object") {
            setStartTime(formatTime(data.start_time));
            setEndTime(formatTime(data.end_time));
        }
    }, [data]);

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Slot</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="p-2 rounded-md font-medium border bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
                    />
                    {error.startTime && (
                        <p className="text-sm text-red-500">
                            {error.startTime}
                        </p>
                    )}
                    <Label htmlFor="endTime">End Time</Label>
                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="p-2 rounded-md font-medium border bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
                    />
                    {error.endTime && (
                        <p className="text-sm text-red-500">{error.endTime}</p>
                    )}
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateSlot;
