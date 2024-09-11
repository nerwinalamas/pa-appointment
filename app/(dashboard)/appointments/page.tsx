import { formatDate } from "@/app/appointment/_lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppointmentButton from "./_components/appointment-button";
import AppointmentTableBody from "./_components/appointment-table-body";
import AppointmentPagination from "./_components/appointment-pagination";
import { getAllAppointmentsDashboard } from "./service";
import { Suspense } from "react";

const Appointments = async ({
    searchParams,
}: {
    searchParams: { page: string };
}) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const { data, error, count } = await getAllAppointmentsDashboard(
        page,
        pageSize
    );

    if (error) {
        return <h1>Error appointment dashboard</h1>;
    }

    const totalPages = Math.ceil(count! / pageSize);

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
                    {data?.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center text-gray-500"
                            >
                                No Appointment Dates Available
                            </TableCell>
                        </TableRow>
                    ) : (
                        data?.map((appointment) => {
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
                        })
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>
                            Page {page} of {totalPages}
                        </TableCell>
                        <TableCell className="text-right">
                            {count} rows
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {count! > pageSize && (
                <Suspense fallback={<div>Loading pagination...</div>}>
                    <AppointmentPagination
                        currentPage={page}
                        totalPages={totalPages}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default Appointments;
