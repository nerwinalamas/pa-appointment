import DashboardSlotAreaChart from "./dashboard-slot-area-chart";
import { getLastSixMonthsAppointments } from "../service";
import { processReservationsData, Reservation } from "../_lib";
import DashboardError from "./dashboard-error";

const DashboardSlotPerMonth = async () => {
    const { data, error } = await getLastSixMonthsAppointments();

    if (error) {
        console.log("Error in Total Bookings Chart: ", error);
        return <DashboardError name="Total Bookings Chart" className="row-span-2 md:col-span-2" />;
    }

    const chartData = processReservationsData(data as Reservation[]);

    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 row-span-2 md:col-span-2">
            <DashboardSlotAreaChart chartData={chartData} />
        </div>
    );
};

export default DashboardSlotPerMonth;
