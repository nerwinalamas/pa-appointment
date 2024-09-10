import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";
import { FormEvent, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import { updateAppointment } from "@/app/(dashboard)/appointments/action";

const UpdateAppointment = () => {
    const { isOpen, onClose, type, data } = useAppointmentModal();
    const isModalOpen = isOpen && type === "updateAppointment";
    const [date, setDate] = useState<Date | undefined>(new Date());

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data) return;

        try {
            const formData = new FormData();
            if (date) formData.append("date", date.toISOString());

            const response = await updateAppointment(data.id, formData);
            if (response.success) {
                toast.success("Update appointment successfully!");
                onClose();
            }
        } catch (error) {
            console.log("Error updating appointment: ", error);
        }
    };

    useEffect(() => {
        if (data && data.date) {
            const parsedDate = parseISO(data.date);
            setDate(parsedDate);
        }
    }, [data]);

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                        <PopoverTrigger id="date" asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                    format(date, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
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

export default UpdateAppointment;
