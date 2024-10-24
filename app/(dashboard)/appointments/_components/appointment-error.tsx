import { AlertCircle } from "lucide-react";

const AppointmentError = () => {
    return (
        <div className="flex flex-col items-center min-h-screen xl:min-h-96 justify-center gap-1 pt-5 pb-20 lg:pb-12 lg:gap-0 lg:mx-auto xl:m-4 xl:p-4 xl:pb-10 bg-slate-100 dark:bg-slate-950">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-base font-light">Error in Appointments Table</h2>
        </div>
    );
};

export default AppointmentError;
