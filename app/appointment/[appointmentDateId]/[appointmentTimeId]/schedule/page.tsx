import { formatDate } from "@/app/appointment/_lib/utils";
import { getAppointmentSchedule } from "../service";
import { formatTime } from "../../_lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Schedule = async ({
    params,
}: {
    params: { appointmentDateId: string; appointmentTimeId: string };
}) => {
    const { appointment, slot } = await getAppointmentSchedule(
        params.appointmentDateId,
        params.appointmentTimeId
    );
    const { dayName, formattedDate } = formatDate(appointment.date);
    const formattedStartTime = formatTime(slot.start_time);
    const formattedEndTime = formatTime(slot.end_time);

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-2">
            <div className="p-4 text-sm rounded-lg bg-slate-200 text-slate-800">
                <h1 className="text-xl font-semibold uppercase mb-2">
                    Appointment Schedule
                </h1>
                <p>
                    Date:{" "}
                    <span className="font-semibold">
                        {formattedDate} ({dayName})
                    </span>
                </p>
                <p>
                    Time:{" "}
                    <span className="font-semibold">
                        {formattedStartTime} - {formattedEndTime}
                    </span>
                </p>
                <p>
                    Name: <span className="font-semibold">{slot.name}</span>
                </p>
                <p>
                    Contact number:{" "}
                    <span className="font-semibold">{slot.contact_number}</span>
                </p>
                <p>
                    Deposit: <span className="font-semibold">P10.00</span>
                </p>
                <p className="flex gap-2">
                    Payment Screenshot:
                    <a
                        href={slot.deposit_screenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink size={18} />
                    </a>
                </p>
            </div>
            <Link href="/">Go back to home page</Link>
        </div>
    );
};

export default Schedule;
