import {
    getAllDays,
    getAllHolidays,
    getAllMonths,
    getAllUnavailableDates,
} from "@/app/(dashboard)/availability/service";
import { DaysCard } from "@/app/(dashboard)/availability/_components/availability-days-card";
import { DatesCard } from "@/app/(dashboard)/availability/_components/availability-dates-card";
import { HolidaysCard } from "@/app/(dashboard)/availability/_components/availability-holidays-card";
import { MonthsCard } from "@/app/(dashboard)/availability/_components/availability-months-card";
import CalendarDayPicker from "./_components/calendar-day-picker";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AppointmentCalendar = async () => {
    const { data: days, error: daysError } = await getAllDays();
    const { data: dates, error: datesError } = await getAllUnavailableDates();
    const { data: holidays, error: holidaysError } = await getAllHolidays();
    const { data: months, error: monthsError } = await getAllMonths();

    if (daysError || datesError || holidaysError || monthsError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Error Loading Data</CardTitle>
                        <CardDescription>
                            There was an error loading the appointment data.
                            Please try again later.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Select a Date</CardTitle>
                    <CardDescription>
                        Choose a date for your appointment
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CalendarDayPicker
                        days={days as DaysCard[]}
                        dates={dates as DatesCard[]}
                        holidays={holidays as HolidaysCard[]}
                        months={months as MonthsCard[]}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentCalendar;
