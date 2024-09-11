import { formatTime } from "@/app/appointment/[appointmentDateId]/_lib/utils";
import { getAllSlots } from "@/app/appointment/[appointmentDateId]/service";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SlotButton from "./_components/slot-button";
import SlotTableBody from "./_components/slot-table-body";
import BackButton from "@/components/shared/back-button";

const AppointmentId = async ({
    params,
}: {
    params: { appointmentId: string };
}) => {
    const { data, error } = await getAllSlots(params.appointmentId);

    if (error) {
        return <h1>Error slots dashboard</h1>;
    }

    return (
        <div className="w-[60%] flex flex-col items-end gap-2">
            <BackButton />
            <SlotButton appointmentId={params.appointmentId} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">
                            Start time
                        </TableHead>
                        <TableHead className="text-center">End time</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">
                            Contact Number
                        </TableHead>
                        <TableHead className="text-center">Deposit</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((slot) => {
                        const formattedStartTime = formatTime(slot.start_time);
                        const formattedEndTime = formatTime(slot.end_time);

                        return (
                            <SlotTableBody
                                key={slot.id}
                                slot={slot}
                                formattedStartTime={formattedStartTime}
                                formattedEndTime={formattedEndTime}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppointmentId;
