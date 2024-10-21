import { getAllStaff } from "../service";

const DashboardTotalStaff = async () => {
    const { count, error } = await getAllStaff();

    if (error) {
        return <h2>Error par</h2>;
    }

    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 xl:row-start-2">
            <h2 className="text-base font-light">Total Staff</h2>
            <p className="text-2xl font-bold">{count}</p>
        </div>
    );
};

export default DashboardTotalStaff;
