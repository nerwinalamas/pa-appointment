import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import { createSlot } from "@/app/(dashboard)/appointments/[appointmentId]/action";
import { useSlotModal } from "@/hooks/useSlotModal";
import { slotSchema } from "@/app/(dashboard)/appointments/[appointmentId]/_lib/schema";
import { ErrorState } from "@/app/(dashboard)/appointments/[appointmentId]/_lib/type";

const CreateSlot = () => {
    const { isOpen, onClose, type, data } = useSlotModal();
    const isModalOpen = isOpen && type === "createSlot";

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState<ErrorState>({});

    const handleDialogChange = () => {
        setStartTime("");
        setEndTime("");
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

        if (!data) return;

        try {
            const formData = new FormData();
            formData.append("startTime", startTime);
            formData.append("endTime", endTime);

            const response = await createSlot(data as string, formData);
            if (response.success) {
                toast.success("Create slot successfully");
                setStartTime("");
                setEndTime("");
                onClose();
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error creating slot: ", error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Slot</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => {
                            setStartTime(e.target.value);
                            setError((prev) => ({ ...prev, startTime: "" }));
                        }}
                        className="p-2 rounded-md font-medium text-slate-800"
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
                        onChange={(e) => {
                            setEndTime(e.target.value);
                            setError((prev) => ({ ...prev, endTime: "" }));
                        }}
                        className="p-2 rounded-md font-medium text-slate-800"
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
                        <Button type="submit" variant="secondary">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSlot;
