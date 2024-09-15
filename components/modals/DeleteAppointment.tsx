import { FormEvent } from "react";
import { deleteAppointment } from "@/app/(dashboard)/appointments/action";
import { formatDate } from "@/app/appointment/_lib/utils";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const DeleteAppointment = () => {
    const { isOpen, onClose, type, data } = useAppointmentModal();
    const isModalOpen = isOpen && type === "deleteAppointment";
    const { dayName, formattedDate } = data
        ? formatDate(data.date)
        : { dayName: "", formattedDate: "" };

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data) return;

        try {
            const response = await deleteAppointment(data.id);
            if (response.success) {
                toast.success("Delete appointment successfully!");
                onClose();
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error creating appointment: ", error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <p>Are you sure you want to delete this appointment?</p>
                    <p className="text-red-500">
                        {formattedDate} - {dayName}
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

export default DeleteAppointment;
