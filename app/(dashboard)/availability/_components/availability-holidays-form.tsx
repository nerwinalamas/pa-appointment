"use client";

import { useState } from "react";
import { createHoliday } from "../action";
import { holidaySchema } from "../_lib/schema";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

type ErrorMessage = {
    date?: string;
    name?: string;
};

const AvailabilityHolidaysForm = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [name, setName] = useState("");
    const [error, setError] = useState<ErrorMessage>({});

    const handleSubmit = async () => {
        const formData = {
            date: date ? format(date, "yyyy-MM-dd") : "",
            name,
        };

        const result = holidaySchema.safeParse(formData);

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
            if (date) formData.append("date", format(date, "MMMM dd, yyyy"));
            formData.append("name", name);

            const response = await createHoliday(formData);
            if (response.success) {
                console.log("holiday created successfully.");
            } else {
                toast.error("Failed to create holiday.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setDate(new Date());
            setName("");
        }
    };

    return (
        <div className="flex flex-col gap-2 md:flex-row">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "MMM dd, yyyy") : "Select Date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </PopoverContent>
            </Popover>
            <div className="w-full flex flex-col gap-1">
                <Input
                    type="text"
                    placeholder="Holiday name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError((prev) => ({ ...prev, name: "" }));
                    }}
                    className={`${error.name && "border-red-500"}`}
                />
                {error.name && (
                    <span className="text-red-500 text-sm">{error.name}</span>
                )}
            </div>

            <Button type="button" variant="secondary" onClick={handleSubmit}>
                Add Holiday
            </Button>
        </div>
    );
};

export default AvailabilityHolidaysForm;
