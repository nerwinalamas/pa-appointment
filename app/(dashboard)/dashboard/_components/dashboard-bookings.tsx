import { getTodaysAppointment } from "../service";
import { CalendarDays } from "lucide-react";

const DashboardBookings = async () => {
    const { count, error } = await getTodaysAppointment();

    if (error) {
        return <h2>Error par</h2>;
    }

    return (
        <div className="flex flex-col justify-between gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-light">Bookings</h2>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
                <p className="text-3xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">for today</p>
            </div>
        </div>
    );
};

export default DashboardBookings;
