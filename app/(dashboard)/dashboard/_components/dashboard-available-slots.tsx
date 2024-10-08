import { getAppointmentByTodaysDate } from "../service";
import { ArrowUp } from "lucide-react";

const DashboardAvailableSlots = async () => {
    const { data, error } = await getAppointmentByTodaysDate();

    if (error) {
        return <h2>Error par</h2>;
    }

    const availableSlots = data && data.length > 0 ? data[0].available_slots : 0;

    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950">
            <h2 className="text-base font-light">Available Slots</h2>
            <p className="text-2xl font-bold">{availableSlots}</p>
            <div className="flex items-center gap-1 text-green-500">
                <ArrowUp size={18} strokeWidth={2} />
                <p>10.4%</p>
            </div>
            <p className="text-xs text-slate-700">for today</p>
        </div>
    );
};

export default DashboardAvailableSlots;
