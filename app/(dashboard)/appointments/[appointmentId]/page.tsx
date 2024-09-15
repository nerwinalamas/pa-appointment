import { getAllSlotsDashboard, getAppointmentDateById } from "./service";
import { formatTime } from "@/app/appointment/[appointmentDateId]/_lib/utils";
import { formatDate } from "@/app/appointment/_lib/utils";
import SlotTableBody from "./_components/slot-table-body";
import SlotButton from "./_components/slot-button";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BackButton from "../../_components/back-button";

const AppointmentId = async ({
    params,
}: {
    params: { appointmentId: string };
}) => {
    const {
        data: slotsData,
        error: slotsError,
        count,
    } = await getAllSlotsDashboard(params.appointmentId);

    const { data: appointmentData, error: appointmentError } =
        await getAppointmentDateById(params.appointmentId);

    if (slotsError) {
        return <h1>Error slots dashboard</h1>;
    }

    if (appointmentError) {
        return <h1>Error getting appointment date dashboard</h1>;
    }

    const { dayName, formattedDate } = formatDate(appointmentData.date);

    return (
        <div className="flex flex-col items-end gap-2 mt-5 mb-20 lg:gap-0 lg:w-[90%] lg:mx-auto xl:w-[65%]">
            <div className="w-full p-4 flex justify-between items-center gap-2">
                <BackButton />
                {appointmentData && (
                    <h1>
                        {formattedDate} - {dayName}
                    </h1>
                )}
                <SlotButton appointmentId={params.appointmentId} />
            </div>
            <Table className="grid gap-3 p-4 lg:gap-0">
                <TableHeader className="hidden lg:grid">
                    <TableRow className="lg:grid lg:grid-cols-10">
                        <TableHead className="text-center">
                            Start time
                        </TableHead>
                        <TableHead className="text-center">End time</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center lg:col-span-2">
                            Name
                        </TableHead>
                        <TableHead className="text-center lg:col-span-2">
                            Contact Number
                        </TableHead>
                        <TableHead className="text-center">Deposit</TableHead>
                        <TableHead className="text-center lg:col-span-2">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 lg:gap-0">
                    {slotsData?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No Slots Available
                            </TableCell>
                        </TableRow>
                    ) : (
                        slotsData?.map((slot) => {
                            const formattedStartTime = formatTime(
                                slot.start_time
                            );
                            const formattedEndTime = formatTime(slot.end_time);

                            return (
                                <SlotTableBody
                                    key={slot.id}
                                    slot={slot}
                                    formattedStartTime={formattedStartTime}
                                    formattedEndTime={formattedEndTime}
                                />
                            );
                        })
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow className="grid">
                        <TableCell className="text-right">
                            {count} rows
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default AppointmentId;
