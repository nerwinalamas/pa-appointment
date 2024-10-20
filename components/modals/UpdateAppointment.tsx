import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { updateAppointment } from "@/app/(dashboard)/appointments/action";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, isBefore, parseISO } from "date-fns";
import toast from "react-hot-toast";
import { ErrorMessage, TimeSlot } from "@/app/(dashboard)/appointments/_types";
import { TIME_SLOTS } from "@/app/(dashboard)/appointments/_lib/constants";

const UpdateAppointment = () => {
    const { isOpen, onClose, type, data } = useAppointmentModal();
    const isModalOpen = isOpen && type === "updateAppointment";

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [timeSlots, setTimeSlots] = useState<TimeSlot | null>(null);
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [depositScreenshot, setDepositScreenshot] = useState<File | null>(
        null
    );
    const [error, setError] = useState<ErrorMessage>({});

    useEffect(() => {
        if (data && isModalOpen) {
            setDate(parseISO(data?.date));
            setTimeSlots(JSON.parse(data.time_slots));
            setName(data?.name);
            setContactNumber(data?.contact_number);
        }
    }, [isModalOpen, data]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDepositScreenshot(e.target.files[0]);
        }
        setError((prev) => ({ ...prev, depositScreenshot: "" }));
    };

    const handleDialogChange = () => {
        setDate(undefined);
        setTimeSlots(null);
        setName("");
        setContactNumber("");
        setDepositScreenshot(null);
        setError({});
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data) return;

        const formData = {
            date,
            timeSlots,
            name,
            contactNumber,
        };

        const result = appointmentSchema.safeParse(formData);

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
            if (date) {
                formData.append("date", format(date, "MMMM dd, yyyy"));
            }
            if (timeSlots) {
                const timeSlotsArray = Array.isArray(timeSlots)
                    ? timeSlots
                    : [timeSlots];
                formData.append("timeSlots", JSON.stringify(timeSlotsArray));
            }
            formData.append("name", name);
            formData.append("contactNumber", contactNumber);
            if (depositScreenshot)
                formData.append("depositScreenshot", depositScreenshot);

            const response = await updateAppointment(data.id, formData);
            if (response.success) {
                toast.success("Update appointment successfully!");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error updating appointment: ", error);
        } finally {
            setDate(undefined);
            setTimeSlots(null);
            setName("");
            setContactNumber("");
            setDepositScreenshot(null);
            setError({});
            onClose();
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent aria-describedby={undefined}>
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
                            />
                        </PopoverContent>
                    </Popover>
                    {error.date && (
                        <p className="text-sm text-red-500">
                            {error.date as string}
                        </p>
                    )}
                    <Label htmlFor="timeSlots" className="cursor-pointer w-max">
                        Time Slot
                    </Label>
                    <Select
                        defaultValue={
                            timeSlots ? JSON.stringify(timeSlots) : ""
                        }
                        onValueChange={(value) => {
                            const parsedTimeSlot = JSON.parse(value);
                            setTimeSlots(parsedTimeSlot);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                            {TIME_SLOTS.map((time, index) => {
                                const timeSlotObject = JSON.stringify(time);
                                return (
                                    <SelectItem
                                        key={index}
                                        value={timeSlotObject}
                                    >
                                        {`${time.start} to ${time.end}`}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    {error.timeSlots && (
                        <p className="text-sm text-red-500">
                            {error.timeSlots}
                        </p>
                    )}
                    <Label htmlFor="name" className="cursor-pointer w-max">
                        Name
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError((prev) => ({ ...prev, name: "" }));
                        }}
                        className={`capitalize ${
                            error.name &&
                            "outline-double outline-2 outline-red-500"
                        }`}
                    />
                    {error.name && (
                        <p className="text-sm text-red-500">{error.name}</p>
                    )}
                    <Label
                        htmlFor="contactNumber"
                        className="cursor-pointer w-max"
                    >
                        Contact Number
                    </Label>
                    <Input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={(e) => {
                            setContactNumber(e.target.value);
                            setError((prev) => ({
                                ...prev,
                                contactNumber: "",
                            }));
                        }}
                        className={`${
                            error.contactNumber &&
                            "outline-double outline-2 outline-red-500"
                        }`}
                    />
                    {error.contactNumber && (
                        <p className="text-sm text-red-500">
                            {error.contactNumber}
                        </p>
                    )}
                    <Label
                        htmlFor="depositScreenshot"
                        className="cursor-pointer w-max"
                    >
                        Deposit Screenshot
                    </Label>
                    <Input
                        type="file"
                        id="depositScreenshot"
                        name="depositScreenshot"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file:text-muted-foreground"
                    />
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateAppointment;
