import { FormEvent } from "react";
import { deleteAppointment } from "@/app/(dashboard)/appointments/action";
import { formatDate } from "@/app/appointment/_lib/utils";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DeleteAppointment = () => {
    const { isOpen, onClose, type, data } = useAppointmentModal();
    const isModalOpen = isOpen && type === "deleteAppointment";
    const { dayName, formattedDate } = data
        ? formatDate(data.date)
        : { dayName: "", formattedDate: "" };
    const timeSlot = data ? JSON.parse(data?.time_slots as string) : "";

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
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Delete Appointment</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this appointment? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            value={`${formattedDate} - ${dayName}`}
                            className="col-span-3"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="timeSlot">Time Slot</Label>
                        <Input
                            id="timeSlot"
                            value={`${timeSlot.start} to ${timeSlot.end}`}
                            className="col-span-3"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data?.name}
                            className="col-span-3 capitalize"
                            readOnly
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                            id="contactNumber"
                            value={data?.contact_number}
                            className="col-span-3"
                            readOnly
                        />
                    </div>
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
