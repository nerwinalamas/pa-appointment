"use client";

import { useStaffModal } from "@/hooks/useStaffModal";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Staff } from "../_types";

const StaffTableRow = ({
    name,
    contact_number,
    email,
    role,
    status,
}: Staff) => {
    const { onOpen } = useStaffModal();

    return (
        <TableRow className="grid xl:grid-cols-7">
            <TableCell>{name}</TableCell>
            <TableCell className="text-center">{contact_number}</TableCell>
            <TableCell className="text-center">{email}</TableCell>
            <TableCell className="text-center">{role}</TableCell>
            <TableCell className="text-center">{status}</TableCell>
            <TableCell className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-center xl:col-span-2">
                <Button
                    variant="secondary"
                    onClick={() => onOpen("updateStaff")}
                    className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                    Update
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onOpen("deleteStaff")}
                    className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default StaffTableRow;
