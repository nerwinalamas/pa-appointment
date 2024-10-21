import DashboardBookings from "./_components/dashboard-bookings";
import DashboardAvailableSlots from "./_components/dashboard-available-slots";
import DashboardTotalStaff from "./_components/dashboard-total-staff";
import DashboardTotalDeposit from "./_components/dashboard-total-deposit";
import DashboardSlotPerMonth from "./_components/dashboard-slot-per-month";
import DashboardTable from "./_components/dashboard-table";
import DashboardTotalBookings from "./_components/dashboard-total-bookings";

const Dashboard = ({
    searchParams,
}: {
    searchParams: { page: string };
}) => {
    return (
        <div className="p-4 grid gap-4 grid-cols-1 grid-rows-10 md:grid-rows-8 md:grid-cols-2 xl:grid-rows-4 xl:grid-cols-4">
            <DashboardBookings />
            <DashboardAvailableSlots />
            <DashboardTotalStaff />
            <DashboardTotalDeposit />
            <DashboardSlotPerMonth />
            <DashboardTable searchParamsPage={searchParams.page} />
            <DashboardTotalBookings />
        </div>
    );
};

export default Dashboard;
