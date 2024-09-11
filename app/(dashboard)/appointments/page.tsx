import { formatDate } from "@/app/appointment/_lib/utils";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import AppointmentButton from "./_components/appointment-button";
import AppointmentTableBody from "./_components/appointment-table-body";

const Appointments = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("appointments").select("*");

    if (error) {
        return <h1>Error appointment dashboard</h1>;
    }

    const filteredData = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <div className="w-[60%] flex flex-col items-end gap-2">
            <AppointmentButton />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">
                            Available slots
                        </TableHead>
                        <TableHead className="text-center">
                            Booked slots
                        </TableHead>
                        <TableHead className="text-center">
                            Total slots
                        </TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData?.map((appointment) => {
                        const { dayName, formattedDate } = formatDate(
                            appointment.date
                        );
                        return (
                            <AppointmentTableBody
                                key={appointment.id}
                                appointment={appointment}
                                formattedDate={formattedDate}
                                dayName={dayName}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default Appointments;
