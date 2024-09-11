import Link from "next/link";
import { AppointmentProps } from "../_types";
import { formatDate } from "../_lib/utils";
import { getSlotCount } from "../service";

const AppointmentCard = async ({
    id,
    date,
    available_slots,
}: AppointmentProps) => {
    const { dayName, formattedDate } = formatDate(date);
    const { count, error } = await getSlotCount(id);

    if (error) {
        return <h1 className="text-slate-200">Error: cannot get count</h1>;
    }

    if (count === 0) {
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

    if (available_slots === 0) {
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
                count === available_slots && count !== 0
                    ? "bg-green-400"
                    : "bg-yellow-400"
            } text-slate-800`}
        >
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-medium uppercase">{dayName}</h1>
                <h2 className="text-sm font-semibold">{formattedDate}</h2>
            </div>
            {count === available_slots && count !== 0 ? (
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
