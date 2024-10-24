import { AlertCircle } from "lucide-react";

const DashboardError = ({ name, className }: { name: string, className?: string }) => {
    return (
        <div className={`flex flex-col gap-1 justify-center items-center p-4 rounded-md bg-slate-100 dark:bg-slate-950 ${className}`}>
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-base font-light">Error in {name}</h2>
        </div>
    );
};

export default DashboardError;
