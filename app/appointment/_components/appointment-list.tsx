import AppointmentCard from "./appointment-card";
import { AppointmentProps } from "../_types";

const AppointmentList = ({ data }: { data: AppointmentProps[] }) => {
    return (
        <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-2 gap-4 md:w-[80%] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {data.length === 0 ? (
                <h1 className="col-span-full text-center text-gray-500">
                    No Appointment Dates Available
                </h1>
            ) : (
                data.map((appointment) => {
                    return (
                        <AppointmentCard
                            key={appointment.id}
                            {...appointment}
                        />
                    );
                })
            )}
        </div>
    );
};

export default AppointmentList;
