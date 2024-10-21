import { getTodaysAppointment } from "../service";
import { SLOTS } from "../_lib/constant";
import { Clock } from "lucide-react";

const DashboardAvailableSlots = async () => {
    const { count, error } = await getTodaysAppointment();

    if (error) {
        return <h2>Error par</h2>;
    }

    return (
        <div className="flex flex-col justify-between gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-light">Available Slots</h2>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
                <p className="text-3xl font-bold">
                    {SLOTS - (count as number)}
                </p>
                <p className="text-xs text-muted-foreground">for today</p>
            </div>
        </div>
    );
};

export default DashboardAvailableSlots;
