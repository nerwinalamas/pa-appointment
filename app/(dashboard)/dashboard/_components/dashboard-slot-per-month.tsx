import DashboardSlotAreaChart from "./dashboard-slot-area-chart";
import { getLastSixMonthsAppointments } from "../service";
import { processReservationsData, Reservation } from "../_lib";

const DashboardSlotPerMonth = async () => {
    const { data, error } = await getLastSixMonthsAppointments();

    if (error) {
        return <h2>Error par</h2>;
    }

    const chartData = processReservationsData(data as Reservation[]);

    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 row-span-2 md:col-span-2">
            <DashboardSlotAreaChart chartData={chartData} />
        </div>
    );
};

export default DashboardSlotPerMonth;
