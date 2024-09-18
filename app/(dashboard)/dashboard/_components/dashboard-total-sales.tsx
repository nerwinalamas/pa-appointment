import { ArrowUp } from "lucide-react";

const DashboardTotalSales = () => {
    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 xl:row-start-2">
            <h2 className="text-base font-light">Total Sales</h2>
            <p className="text-xl font-bold">50</p>
            <div className="flex items-center gap-1 text-green-500">
                <ArrowUp size={18} strokeWidth={2} />
                <p>10.4%</p>
            </div>
            <p className="text-xs text-slate-700">for this month</p>
        </div>
    );
};

export default DashboardTotalSales;
