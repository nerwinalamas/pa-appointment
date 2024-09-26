import { Suspense } from "react";
import { getAllBookingsWithAppointmentDate } from "../service";
import { formatDate } from "@/app/appointment/_lib/utils";
import { formatTime } from "@/app/appointment/[appointmentDateId]/_lib/utils";
import PageHandler from "@/components/shared/page-handler";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

const DashboardTable = async ({ searchParamsPage }: { searchParamsPage: string }) => {
    const page = parseInt(searchParamsPage) || 1;
    const pageSize = 6;

    const {
        data: bookings,
        error,
        count,
    } = await getAllBookingsWithAppointmentDate(page, pageSize);

    if (error) {
        return <h1>Error par</h1>;
    }

    const totalPages = Math.ceil(count! / pageSize);

    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 row-span-2 md:col-span-2 xl:col-span-3">
            <Table className="p-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">
                            Contact Number
                        </TableHead>
                        <TableHead className="text-center">
                            Deposit Screenshot
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings?.map((booking) => {
                        const { dayName, formattedDate } = formatDate(
                            booking.appointments.date
                        );
                        const formattedStartTime = formatTime(
                            booking.start_time
                        );
                        const formattedEndTime = formatTime(booking.end_time);

                        return (
                            <TableRow key={booking.id}>
                                <TableCell>
                                    {formattedDate} - {dayName}
                                </TableCell>
                                <TableCell className="text-center">
                                    {formattedStartTime} - {formattedEndTime}
                                </TableCell>
                                <TableCell className="text-center">
                                    {booking.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {booking.contact_number}
                                </TableCell>
                                <TableCell>
                                    <a
                                        href={booking.deposit_screenshot}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink
                                            size={18}
                                            className="mx-auto"
                                        />
                                    </a>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {count! > pageSize && (
                <Suspense fallback={<div>Loading pagination...</div>}>
                    <PageHandler
                        currentPage={page}
                        totalPages={totalPages}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default DashboardTable;
