import { getAllSlots } from "./service";
import TimeCard from "./_components/time-card";

import AppointmentBackButton from "../_components/appointment-back-button";

const SelectTime = async ({
    params,
}: {
    params: { appointmentDateId: string };
}) => {
    const { data, error } = await getAllSlots(params.appointmentDateId);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mx-auto p-4 lg:w-[80%]">
            <AppointmentBackButton />
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
                {data?.map((time) => (
                    <TimeCard
                        key={time.id}
                        startTime={time.start_time.slice(0, 5)}
                        endTime={time.end_time.slice(0, 5)}
                        {...time}
                        appointmentDateId={params.appointmentDateId}
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectTime;
