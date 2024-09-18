import DashboardBookings from "./_components/dashboard-bookings";
import DashboardAvailableSlots from "./_components/dashboard-available-slots";
import DashboardTotalSlots from "./_components/dashboard-total-slots";
import DashboardTotalSales from "./_components/dashboard-total-sales";
import DashboardSlotAreaChart from "./_components/dashboard-slot-area-chart";
import DashboardTable from "./_components/dashboard-table";
import DashboardTotalBookingsChart from "./_components/dashboard-total-bookings-chart";

const Dashboard = () => {
    return (
        <div className="p-4 grid gap-4 grid-rows-10 md:grid-rows-8 md:grid-cols-2 xl:grid-rows-4 xl:grid-cols-4">
            <DashboardBookings />
            <DashboardAvailableSlots />
            <DashboardTotalSlots />
            <DashboardTotalSales />
            <DashboardSlotAreaChart />
            <DashboardTable />
            <DashboardTotalBookingsChart />
        </div>
    );
};

export default Dashboard;
