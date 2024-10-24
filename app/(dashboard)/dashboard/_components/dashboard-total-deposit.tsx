import { DEPOSIT_AMOUNT } from "../_lib/constant";
import { getCurrentMonthAppointments } from "../service";
import DashboardError from "./dashboard-error";
import { DollarSign } from "lucide-react";

const DashboardTotalDeposit = async () => {
    const { count, error } = await getCurrentMonthAppointments();

    if (error) {
        console.log("Error in Total Deposit: ", error);
        return <DashboardError name="Total Deposit" className="xl:row-start-2" />;
    }

    return (
        <div className="flex flex-col justify-between gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 xl:row-start-2">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-light">Total Deposit</h2>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
                <p className="text-3xl font-bold">
                    {(count as number) * DEPOSIT_AMOUNT}
                </p>
                <p className="text-xs text-muted-foreground">for this month</p>
            </div>
        </div>
    );
};

export default DashboardTotalDeposit;
