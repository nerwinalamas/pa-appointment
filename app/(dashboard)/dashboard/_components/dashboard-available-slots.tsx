import { getTodaysAppointment } from "../service";
import { getAllTimeSlots } from "../../availability/service";
import DashboardError from "./dashboard-error";
import { Clock } from "lucide-react";

const DashboardAvailableSlots = async () => {
    const { count: todaysAppointmentCount, error: todaysAppointmentError } =
        await getTodaysAppointment();
    const { count: timeSlotsCount, error: timeSlotsError } =
        await getAllTimeSlots();

    if (todaysAppointmentError) {
        console.log("Error in Available Slots: ", todaysAppointmentError);
        return <DashboardError name="Available Slots" />;
    }

    if (timeSlotsError) {
        console.log("Error in Available Slots: ", timeSlotsError);
        return <DashboardError name="Available Slots" />;
    }

    return (
        <div className="flex flex-col justify-between gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-light">Available Slots</h2>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
                <p className="text-3xl font-bold">
                    {(timeSlotsCount as number) -
                        (todaysAppointmentCount as number)}
                </p>
                <p className="text-xs text-muted-foreground">for today</p>
            </div>
        </div>
    );
};

export default DashboardAvailableSlots;
