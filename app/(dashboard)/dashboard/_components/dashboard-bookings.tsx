import { getTodaysAppointment } from "../service";

const DashboardBookings = async () => {
    const { count, error } = await getTodaysAppointment();

    if (error) {
        return <h2>Error par</h2>;
    }

    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950">
            <h2 className="text-base font-light">Bookings</h2>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-xs text-slate-700">for today</p>
        </div>
    );
};

export default DashboardBookings;
