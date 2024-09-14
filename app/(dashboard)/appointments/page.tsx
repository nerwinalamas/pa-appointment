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
import { getAllAppointmentsDashboard, isLoggedIn } from "./service";
import { Suspense } from "react";
import AppointmentDownload from "./_components/appointment-download";
import { redirect } from "next/navigation";

const Appointments = async ({
    searchParams,
}: {
    searchParams: { page: string };
}) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 8;

    const { data, error, count } = await getAllAppointmentsDashboard(
        page,
        pageSize
    );

    if (error) {
        return <h1>Error appointment dashboard</h1>;
    }

    const totalPages = Math.ceil(count! / pageSize);

    const { session } = await isLoggedIn();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col items-end gap-2 mt-5 mb-20 lg:gap-0 lg:w-[90%] lg:mx-auto xl:w-[65%]">
            <div className="w-full p-4 flex justify-end items-center gap-2">
                <AppointmentButton />
                <AppointmentDownload />
            </div>
            <Table className="grid gap-3 p-4 lg:gap-0">
                <TableHeader className="hidden lg:grid">
                    <TableRow className="lg:grid lg:grid-cols-7">
                        <TableHead className="lg:col-span-2">Date</TableHead>
                        <TableHead className="text-center">
                            Available slots
                        </TableHead>
                        <TableHead className="text-center">
                            Booked slots
                        </TableHead>
                        <TableHead className="text-center">
                            Total slots
                        </TableHead>
                        <TableHead className="text-center lg:col-span-2">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 lg:gap-0">
                    {data?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
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
                <TableFooter className="grid">
                    <TableRow className="grid grid-cols-2 lg:grid-cols-7">
                        <TableCell colSpan={4} className="lg:col-span-5">
                            Page {page} of {totalPages}
                        </TableCell>
                        <TableCell className="text-right lg:col-span-2">
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
