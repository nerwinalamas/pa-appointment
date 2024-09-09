import TimeCard from "./_components/time-card";
import { getAllSlots } from "./service";

const SelectTime = async ({ params }: { params: { appointmentDateId: string } }) => {
    const { data, error } = await getAllSlots(params.appointmentDateId);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:w-[80%] xl:grid-cols-6">
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
    );
};

export default SelectTime;
