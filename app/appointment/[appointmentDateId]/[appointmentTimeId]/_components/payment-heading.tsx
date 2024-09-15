import { getAppointmentSchedule } from "../service";
import { formatDate } from "@/app/appointment/_lib/utils";
import { formatTime } from "../../_lib/utils";

const PaymentHeading = async ({
    dateId,
    timeId,
}: {
    dateId: string;
    timeId: string;
}) => {
    const { appointment, slot } = await getAppointmentSchedule(dateId, timeId);
    const { dayName, formattedDate } = formatDate(appointment.date);
    const formattedStartTime = formatTime(slot.start_time);
    const formattedEndTime = formatTime(slot.end_time);

    return (
        <h1 className="mb-5 text-2xl text-center md:w-[70%] md:mb-7 lg:w-[80%] xl:w-[60%]">
            To reserve your slot on{" "}
            <span className="font-semibold lg:font-bold">{formattedDate}</span>, from{" "}
            <span className="font-semibold lg:font-bold">
                {formattedStartTime} to {formattedEndTime} ({dayName})
            </span>
            , kindly pay the required deposit.
        </h1>
    );
};

export default PaymentHeading;
