// import { Suspense } from "react";
// import PageHandler from "@/components/shared/page-handler";
import { createClient } from "@/utils/supabase/server";
import StaffCreateButton from "./_components/staff-create-button";
import StaffTableRow from "./_components/staff-table-row";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Staff = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("staff").select("*");

    if (error) {
        console.log("Error fetching staff: ", error.message);
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <div className="flex flex-col items-end gap-2 pt-5 pb-20 lg:pb-12 lg:gap-0 lg:mx-auto xl:m-4 xl:p-4 bg-slate-100 dark:bg-slate-950">
            <div className="w-full p-4 flex justify-end items-center gap-2">
                <StaffCreateButton />
            </div>
            <Table className="p-4">
                <TableHeader className="hidden xl:grid">
                    <TableRow className="grid xl:grid-cols-7">
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">
                            Contact Number
                        </TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Role</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center xl:col-span-2">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 xl:gap-0">
                    {data?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No Staff
                            </TableCell>
                        </TableRow>
                    ) : (
                        data?.map((staff) => {
                            return <StaffTableRow key={staff.id} {...staff} />;
                        })
                    )}
                </TableBody>
            </Table>
            {/* {count! > pageSize && (
                <Suspense fallback={<div>Loading pagination...</div>}>
                    <PageHandler currentPage={page} totalPages={totalPages} />
                </Suspense>
            )} */}
        </div>
    );
};

export default Staff;
