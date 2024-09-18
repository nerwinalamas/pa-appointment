import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Staff = () => {
    return (
        <Table className="p-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Mary Doe</TableCell>
                    <TableCell>09123456798</TableCell>
                    <TableCell>md@gmail.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center lg:col-span-2">
                        <Button
                            variant="secondary"
                            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                            Update
                        </Button>
                        <Button
                            variant="secondary"
                            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>09123456798</TableCell>
                    <TableCell>jd@gmail.com</TableCell>
                    <TableCell>Super Admin</TableCell>
                    <TableCell className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center lg:col-span-2">
                        <Button
                            variant="secondary"
                            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                            Update
                        </Button>
                        <Button
                            variant="secondary"
                            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Julia Doe</TableCell>
                    <TableCell>09123456798</TableCell>
                    <TableCell>juliadoe@gmail.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center lg:col-span-2">
                        <Button
                            variant="secondary"
                            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                            Update
                        </Button>
                        <Button
                            variant="secondary"
                            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Staff;
