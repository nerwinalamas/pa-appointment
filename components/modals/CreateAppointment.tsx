import { FormEvent, useState } from "react";
import { createAppointment } from "@/app/(dashboard)/appointments/action";
import { appointmentSchema } from "@/app/(dashboard)/appointments/_lib/schema";
import { useAppointmentModal } from "@/hooks/useAppointmentModal";
import { cn } from "@/lib/utils";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, isBefore } from "date-fns";
import toast from "react-hot-toast";

const CreateAppointment = () => {
    const { isOpen, onClose, type } = useAppointmentModal();
    const isModalOpen = isOpen && type === "createAppointment";

    const [date, setDate] = useState<Date | undefined>(new Date());

    const handleDialogChange = () => {
        setDate(new Date());
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = {
            date,
        };

        const result = appointmentSchema.safeParse(formData);

        if (!result.success) {
            toast.error("Invalid data. Please check your input.");
            return;
        }

        try {
            const formData = new FormData();
            if (date) formData.append("date", date.toISOString());

            const response = await createAppointment(formData);
            if (response.success) {
                toast.success("Create appointment successfully!");
                setDate(undefined);
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
                    <DialogTitle>Create Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                        <PopoverTrigger id="date" asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
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
                                disabled={(dateToDisable) => {
                                    const currentDate = new Date();

                                    const formattedCurrentDate = format(
                                        currentDate,
                                        "MM-dd-yyyy"
                                    );
                                    const formattedDate = format(
                                        dateToDisable,
                                        "MM-dd-yyyy"
                                    );

                                    return isBefore(
                                        new Date(formattedDate),
                                        new Date(formattedCurrentDate)
                                    );
                                }}
                                className="flex items-start justify-start"
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
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAppointment;
