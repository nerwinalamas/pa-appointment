"use client";

import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, isEqual } from "date-fns";
import { useRouter } from "next/navigation";
import { useReservation } from "@/hooks/useReservation";
import { DaysCard } from "@/app/(dashboard)/availability/_components/availability-days-card";
import { DatesCard } from "@/app/(dashboard)/availability/_components/availability-dates-card";
import { DAY_NAMES, MONTH_NAMES } from "../_lib/constant";
import { HolidaysCard } from "@/app/(dashboard)/availability/_components/availability-holidays-card";
import { MonthsCard } from "@/app/(dashboard)/availability/_components/availability-months-card";

const CalendarDayPicker = ({
    days,
    dates,
    holidays,
    months,
}: {
    days: DaysCard[];
    dates: DatesCard[];
    holidays: HolidaysCard[];
    months: MonthsCard[];
}) => {
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

    const disabledDates =
        dates && dates.length > 0
            ? dates.map((date) => new Date(date.date))
            : [];

    const disabledHolidays =
        holidays && holidays.length > 0
            ? holidays.map((date) => new Date(date.date))
            : [];

    return (
        <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleSelectDate}
            className="w-max rounded-md border"
            disabled={(dateToDisable) => {
                const currentDate = new Date();
                const dayName = DAY_NAMES[dateToDisable.getDay()];
                const monthName = MONTH_NAMES[dateToDisable.getMonth()];

                const formattedCurrentDate = format(currentDate, "MM-dd-yyyy");
                const formattedDate = format(dateToDisable, "MM-dd-yyyy");

                const isDisabledDay =
                    Array.isArray(days) &&
                    days.some(
                        (day) => day.is_unavailable && day.name === dayName
                    );
                const isDisabledMonth =
                    Array.isArray(months) &&
                    months.some(
                        (month) =>
                            month.is_unavailable && month.name === monthName
                    );
                const isDisabledDate = disabledDates.some((disabledDate) =>
                    isEqual(format(disabledDate, "MM-dd-yyyy"), formattedDate)
                );
                const isDisabledHoliday = disabledHolidays.some(
                    (disabledDate) =>
                        isEqual(
                            format(disabledDate, "MM-dd-yyyy"),
                            formattedDate
                        )
                );

                return (
                    isBefore(
                        new Date(formattedDate),
                        new Date(formattedCurrentDate)
                    ) ||
                    isDisabledDay ||
                    isDisabledDate ||
                    isDisabledHoliday ||
                    isDisabledMonth
                );
            }}
        />
    );
};

export default CalendarDayPicker;
