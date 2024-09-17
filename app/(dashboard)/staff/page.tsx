import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Staff = () => {
    return (
        <Table className="p-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Staff;
