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

const CreateSlot = () => {
    const { isOpen, onClose, type, data } = useSlotModal();
    const isModalOpen = isOpen && type === "createSlot";

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

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
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSlot;
