import { FormEvent } from "react";
import { deleteSlot } from "@/app/(dashboard)/appointments/[appointmentId]/action";
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
import toast from "react-hot-toast";

const DeleteSlot = () => {
    const { isOpen, onClose, type, data } = useSlotModal();
    const isModalOpen = isOpen && type === "deleteSlot";

    const formattedStartTime =
        typeof data === "object" && "start_time" in data
            ? formatTime(data.start_time)
            : "";

    const formattedEndTime =
        typeof data === "object" && "end_time" in data
            ? formatTime(data.end_time)
            : "";

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data || typeof data === "string") return;

        try {
            const response = await deleteSlot(data.appointment_id, data.id);
            if (response.success) {
                toast.success("Delete slot successfully");
                onClose();
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error deleting slot: ", error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Slot</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <p>Are you sure you want to delete this slot?</p>
                    <p className="font-semibold text-red-500">
                        {formattedStartTime} - {formattedEndTime}
                    </p>
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteSlot;
