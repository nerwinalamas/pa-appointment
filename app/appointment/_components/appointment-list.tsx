import AppointmentCard from "./appointment-card";
import { AppointmentProps } from "../_types";

const AppointmentList = ({ data }: { data: AppointmentProps[] }) => {
    return (
        <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:w-[80%] xl:grid-cols-6">
            {data.map((appointment) => {
                return (
                    <AppointmentCard key={appointment.id} {...appointment} />
                );
            })}
        </div>
    );
};

export default AppointmentList;
