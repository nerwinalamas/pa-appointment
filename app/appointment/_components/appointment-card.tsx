import Link from "next/link";
import { AppointmentProps } from "../_types";
import { formatDate } from "../_lib/utils";

const AppointmentCard = ({ id, date, available_slots }: AppointmentProps) => {
    const { dayName, formattedDate } = formatDate(date);

    return (
        <Link
            href={`/appointment/${id}`}
            className="flex flex-col justify-between h-40 p-4 rounded-lg bg-slate-100 text-slate-800"
        >
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-medium uppercase">{dayName}</h1>
                <h2 className="text-sm font-semibold">{formattedDate}</h2>
            </div>
            {available_slots === 0 ? (
                <p className="text-sm uppercase">Fully Booked</p>
            ) : (
                <p className="text-sm uppercase">
                    {available_slots} Slots Available
                </p>
            )}
        </Link>
    );
};

export default AppointmentCard;
