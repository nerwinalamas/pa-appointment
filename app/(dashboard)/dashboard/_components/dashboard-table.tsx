import { Suspense } from "react";
import Link from "next/link";
import { getAllReservations } from "../service";
import { formatDate } from "../../appointments/_lib";
import PageHandler from "@/components/shared/page-handler";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileCheck } from "lucide-react";

const DashboardTable = async ({
    searchParamsPage,
}: {
    searchParamsPage: string;
}) => {
    const page = parseInt(searchParamsPage) || 1;
    const pageSize = 6;

    const {
        data: bookings,
        error,
        count,
    } = await getAllReservations(page, pageSize);

    if (error) {
        return <h2>Error par</h2>;
    }

    const totalPages = Math.ceil((count as number) / pageSize);

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
                        <TableHead className="text-center">Deposit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings?.map((booking) => {
                        const { dayName, formattedDate } = formatDate(
                            booking.date
                        );
                        const timeSlots = JSON.parse(booking.time_slots);

                        return (
                            <TableRow key={booking.id}>
                                <TableCell>
                                    {formattedDate} - {dayName}
                                </TableCell>
                                <TableCell className="text-center">
                                    {timeSlots.start} - {timeSlots.end}
                                </TableCell>
                                <TableCell className="text-center capitalize">
                                    {booking.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {booking.contact_number}
                                </TableCell>
                                <TableCell className="flex items-start justify-center">
                                    {booking.deposit_screenshots && (
                                        <Link
                                            href={booking.deposit_screenshots}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FileCheck className="h-5 w-5 text-green-500" />
                                        </Link>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {count! > pageSize && (
                <Suspense fallback={<div>Loading pagination...</div>}>
                    <PageHandler currentPage={page} totalPages={totalPages} />
                </Suspense>
            )}
        </div>
    );
};

export default DashboardTable;
