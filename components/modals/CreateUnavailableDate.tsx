import { FormEvent, useState } from "react";
import { useUnavailableDateModal } from "@/hooks/useUnavailableDateModal";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { createUnavailableDate } from "@/app/(dashboard)/availability/action";

const CreateUnavailableDate = () => {
    const { isOpen, onClose, type } = useUnavailableDateModal();
    const isModalOpen = isOpen && type === "createUnavailableDate";

    const [date, setDate] = useState<Date | undefined>(undefined);

    const handleDialogChange = () => {
        setDate(undefined);
        onClose();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (date) formData.append("date", format(date, "MMMM dd, yyyy"));

            const response = await createUnavailableDate(formData);
            if (response.success) {
                toast.success("Add unavailable date successfully.");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error creating unavailable date: ", error);
            toast.error("Something went wrong.");
        } finally {
            setDate(undefined);
            onClose();
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Unavailable Date</DialogTitle>
                    <DialogDescription>
                        Set a date when you&apos;ll be unavailable for
                        appointments.
                    </DialogDescription>
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

export default CreateUnavailableDate;
