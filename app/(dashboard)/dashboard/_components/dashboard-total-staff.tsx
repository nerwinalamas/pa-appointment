import { getAllStaff } from "../service";
import DashboardError from "./dashboard-error";
import { Users } from "lucide-react";

const DashboardTotalStaff = async () => {
    const { count, error } = await getAllStaff();

    if (error) {
        console.log("Error in Total Staff: ", error);
        return <DashboardError name="Total Staff" className="xl:row-start-2" />;
    }

    return (
        <div className="flex flex-col justify-between p-4 rounded-md bg-slate-100 dark:bg-slate-950 xl:row-start-2">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-medium">Total Staff</h2>
                <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
                <p className="text-3xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">for this month</p>
            </div>
        </div>
    );
};

export default DashboardTotalStaff;
