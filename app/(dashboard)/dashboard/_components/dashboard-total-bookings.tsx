import DashboardTotalBookingsChart from "./dashboard-total-bookings-chart";
import DashboardError from "./dashboard-error";
import { getTotalAppointments } from "../service";
import { TrendingUp } from "lucide-react";

const DashboardTotalBookings = async () => {
    const { count, error } = await getTotalAppointments();

    if (error) {
        console.log("Error in Total Bookings: ", error);
        return <DashboardError name="Total Bookings" className="row-span-2 md:col-span-2 xl:col-span-1" />;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 row-span-2 md:col-span-2 xl:col-span-1">
            <DashboardTotalBookingsChart count={count as number} />
            <div className="flex flex-col items-center justify-center gap-2 text-sm">
                <h3 className="flex items-center gap-2 font-medium leading-none">
                    Total Bookings
                    <TrendingUp className="h-4 w-4" />
                </h3>
                <p className="leading-none text-muted-foreground">
                    Displaying total bookings
                </p>
            </div>
        </div>
    );
};

export default DashboardTotalBookings;
