import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import { useSlotModal } from "@/hooks/useSlotModal";
import { updateSlot } from "@/app/(dashboard)/appointments/[appointmentId]/action";
import { formatTime } from "@/app/appointment/[appointmentDateId]/_lib/utils";

const UpdateSlot = () => {
    const { isOpen, onClose, type, data } = useSlotModal();
    const isModalOpen = isOpen && type === "updateSlot";

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data || typeof data !== "object") return;

        try {
            const formData = new FormData();
            formData.append("startTime", startTime);
            formData.append("endTime", endTime);

            const response = await updateSlot(data.id, formData);
            if (response.success) {
                toast.success("Update slot successfully");
                onClose();
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
                    <Label htmlFor="start_time">Start Time</Label>
                    <input
                        type="time"
                        id="start_time"
                        name="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="p-2 rounded-md font-medium text-slate-800"
                    />
                    <Label htmlFor="end_time">End Time</Label>
                    <input
                        type="time"
                        id="end_time"
                        name="end_time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="p-2 rounded-md font-medium text-slate-800"
                    />
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="secondary">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateSlot;
