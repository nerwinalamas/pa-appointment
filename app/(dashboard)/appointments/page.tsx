import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAllReservations, isLoggedIn } from "./service";
import PageHandler from "@/components/shared/page-handler";
import AppointmentButton from "./_components/appointment-button";
import AppointmentTableRow from "./_components/appointment-table-row";
import AppointmentDownload from "./_components/appointment-download";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Appointments = async ({
    searchParams,
}: {
    searchParams: { page: string };
}) => {
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 8;

    const { data, error, count } = await getAllReservations(page, pageSize);

    if (error) {
        return <h1>Error appointment dashboard</h1>;
    }

    const totalPages = Math.ceil(count! / pageSize);

    const { session } = await isLoggedIn();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col items-end gap-2 pt-5 pb-20 lg:pb-12 lg:gap-0 lg:mx-auto xl:m-4 xl:p-4 xl:pb-10 bg-slate-100 dark:bg-slate-950">
            <div className="w-full p-4 flex justify-end items-center gap-2">
                <AppointmentButton />
                <AppointmentDownload />
            </div>
            <Table className="grid gap-3 p-4 xl:gap-0">
                <TableHeader className="hidden xl:grid">
                    <TableRow className="xl:grid xl:grid-cols-11">
                        <TableHead className="xl:col-span-2">Date</TableHead>
                        <TableHead className="text-center xl:col-span-2">
                            Time slots
                        </TableHead>
                        <TableHead className="text-center xl:col-span-2">
                            Name
                        </TableHead>
                        <TableHead className="text-center xl:col-span-2">
                            Contact Number
                        </TableHead>
                        <TableHead className="text-center">Deposit</TableHead>
                        <TableHead className="text-center xl:col-span-2">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 xl:gap-0">
                    {data?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No Appointment Dates Available
                            </TableCell>
                        </TableRow>
                    ) : (
                        data?.map((appointment) => {
                            return (
                                <AppointmentTableRow
                                    key={appointment.id}
                                    appointment={appointment}
                                />
                            );
                        })
                    )}
                </TableBody>
                <TableFooter className="grid">
                    <TableRow className="grid grid-cols-2 xl:grid-cols-11">
                        <TableCell colSpan={4} className="xl:col-span-9">
                            Page {page} of {totalPages}
                        </TableCell>
                        <TableCell className="text-right xl:col-span-2">
                            {count} rows
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {count! > pageSize && (
                <Suspense fallback={<div>Loading pagination...</div>}>
                    <PageHandler currentPage={page} totalPages={totalPages} />
                </Suspense>
            )}
        </div>
    );
};

export default Appointments;
