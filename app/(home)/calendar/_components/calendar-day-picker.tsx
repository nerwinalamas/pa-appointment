"use client";

import { Calendar } from "@/components/ui/calendar";
import { format, isBefore } from "date-fns";
import { useRouter } from "next/navigation";
import { useReservation } from "@/hooks/useReservation";

const CalendarDayPicker = () => {
    const { selectedDate, setSelectedDate } = useReservation();
    const router = useRouter();

    const handleSelectDate = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setSelectedDate(selectedDate);
            router.push(
                `/time-slots?date=${format(selectedDate, "MM-dd-yyyy")}`
            );
        }
    };

    return (
        <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleSelectDate}
            className="w-max rounded-md border"
            disabled={(dateToDisable) => {
                const currentDate = new Date();

                const formattedCurrentDate = format(currentDate, "MM-dd-yyyy");
                const formattedDate = format(dateToDisable, "MM-dd-yyyy");

                return isBefore(
                    new Date(formattedDate),
                    new Date(formattedCurrentDate)
                );
            }}
        />
    );
};

export default CalendarDayPicker;
