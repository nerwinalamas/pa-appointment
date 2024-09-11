import AppointmentCard from "./appointment-card";
import { AppointmentProps } from "../_types";

const AppointmentList = ({ data }: { data: AppointmentProps[] }) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const filteredData = data
        .filter((item) => {
            const itemDate = new Date(item.date);
            itemDate.setHours(0, 0, 0, 0);
            return (
                itemDate.getMonth() === currentMonth &&
                itemDate.getFullYear() === currentYear &&
                itemDate >= currentDate
            );
        })
        .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

    return (
        <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:w-[80%] xl:grid-cols-6">
            {filteredData.map((appointment) => {
                return (
                    <AppointmentCard key={appointment.id} {...appointment} />
                );
            })}
        </div>
    );
};

export default AppointmentList;
