import Link from "next/link";
import { AppointmentProps } from "../_types";
import { formatDate } from "../_lib/utils";

const AppointmentCard = async ({
    id,
    date,
    available_slots,
    slotCount
}: AppointmentProps) => {
    const { dayName, formattedDate } = formatDate(date);

    if (slotCount === 0 && available_slots === 0) {
        return (
            <div className="flex flex-col justify-between h-40 p-4 rounded-lg cursor-not-allowed bg-gray-400 text-slate-800">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-medium uppercase">{dayName}</h1>
                    <h2 className="text-sm font-semibold">{formattedDate}</h2>
                </div>
                <p className="text-sm uppercase">Not Available</p>
            </div>
        );
    }

    if (slotCount !== 0 && available_slots === 0) {
        return (
            <div className="flex flex-col justify-between h-40 p-4 rounded-lg cursor-not-allowed bg-red-400 text-slate-800">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-medium uppercase">{dayName}</h1>
                    <h2 className="text-sm font-semibold">{formattedDate}</h2>
                </div>
                <p className="text-sm uppercase">Fully Booked</p>
            </div>
        );
    }

    return (
        <Link
            href={`/appointment/${id}`}
            className={`flex flex-col justify-between h-40 p-4 rounded-lg ${
                slotCount === available_slots && slotCount !== 0
                    ? "bg-green-400"
                    : "bg-yellow-400"
            } text-slate-800`}
        >
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-medium uppercase">{dayName}</h1>
                <h2 className="text-sm font-semibold">{formattedDate}</h2>
            </div>
            {slotCount === available_slots && slotCount !== 0 ? (
                <p className="text-sm uppercase">
                    {available_slots} Slots Available
                </p>
            ) : (
                <p className="text-sm uppercase">
                    {available_slots}{" "}
                    {available_slots > 1 ? "Slots Available" : "Slot Available"}
                </p>
            )}
        </Link>
    );
};

export default AppointmentCard;