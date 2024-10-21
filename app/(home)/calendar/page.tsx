import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CalendarDayPicker from "./_components/calendar-day-picker";

const AppointmentCalendar = () => {
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
                    <CalendarDayPicker />
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentCalendar;
