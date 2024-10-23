import { FormEvent, useState } from "react";
import { createTimeSlot } from "@/app/(dashboard)/availability/action";
import { useTimeSlotModal } from "@/hooks/useTimeSlotModal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { timeSlotSchema } from "@/app/(dashboard)/availability/_lib/schema";

type ErrorMessage = {
    startTime?: string;
    endTime?: string;
};

const CreateTimeSlot = () => {
    const { isOpen, onClose, type } = useTimeSlotModal();
    const isModalOpen = isOpen && type === "createTimeSlot";

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState<ErrorMessage>({});

    const handleDialogChange = () => {
        setStartTime("");
        setEndTime("");
        setError({});
        onClose();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            startTime,
            endTime,
        };

        const result = timeSlotSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            type ErrorKeys = keyof typeof formattedErrors;
            setError(
                Object.keys(formattedErrors).reduce((acc, key) => {
                    const typedKey = key as ErrorKeys;
                    acc[typedKey] = formattedErrors[typedKey]?.[0] || "";
                    return acc;
                }, {} as ErrorMessage)
            );
            return;
        }

        setError({});

        try {
            const formData = new FormData();
            formData.append("startTime", startTime);
            formData.append("endTime", endTime);

            const response = await createTimeSlot(formData);
            if (response.success) {
                toast.success("Add time slot successfully.");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error creating time slot: ", error);
            toast.error("Something went wrong.");
        } finally {
            setStartTime("");
            setEndTime("");
            onClose();
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Time Slot</DialogTitle>
                    <DialogDescription>
                        Set the start and end times for your new time slot. This
                        will be used to schedule your availability.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="mt-2 flex flex-col gap-4"
                >
                    <div className="grid grid-cols-4 place-items-center">
                        <Label>Start Time</Label>
                        <div className="w-full col-span-3">
                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                    setError((prev) => ({
                                        ...prev,
                                        startTime: "",
                                    }));
                                }}
                                className={`${
                                    error.startTime && "border-red-500"
                                }`}
                            />
                            {error.startTime && (
                                <p className="mt-1 text-sm text-red-500">
                                    {error.startTime}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 place-items-center">
                        <Label>End Time</Label>
                        <div className="w-full col-span-3">
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => {
                                    setEndTime(e.target.value);
                                    setError((prev) => ({
                                        ...prev,
                                        endTime: "",
                                    }));
                                }}
                                className={`${
                                    error.endTime && "border-red-500"
                                }`}
                            />
                            {error.endTime && (
                                <p className="mt-1 text-sm text-red-500">
                                    {error.endTime}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTimeSlot;
