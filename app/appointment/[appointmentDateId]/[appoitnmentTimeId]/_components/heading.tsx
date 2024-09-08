import { getAppointmentSchedule } from "../service";

const Heading = async ({ dateId, timeId }: { dateId: string, timeId: string }) => {
    console.log("Received dateId:", dateId, "and timeId:", timeId);

    const { appointment, slot } = await getAppointmentSchedule(dateId, timeId);
    console.log("appointment sched: ", appointment);
    console.log("slot sched: ", slot);
    return (
        <h1 className="text-2xl text-center">
            To reserve your slot on{" "}
            <span className="font-semibold">September 6, 2024</span>, from{" "}
            <span className="font-semibold">08:00 to 09:00 (Friday)</span>,
            kindly pay the required deposit.
        </h1>
    );
};

export default Heading;
