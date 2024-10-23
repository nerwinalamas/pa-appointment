import { getAllTimeSlots } from "../service";
import AvailabilityHoursAddButton from "./availability-hours-add-button";
import AvailabilityHoursTableRow from "./availability-hours-table-row";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const AvailabilityHours = async () => {
    const { data, error } = await getAllTimeSlots();

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <Card className="w-max relative">
            <CardHeader>
                <CardTitle>Daily Availability Hours</CardTitle>
                <CardDescription>
                    Set your daily availability hours
                </CardDescription>
            </CardHeader>
            <AvailabilityHoursAddButton />
            <CardContent className="px-3 md:px-6">
                {data && data.length > 0 ? (
                    <Table className="w-full md:w-96">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">
                                    Start Time
                                </TableHead>
                                <TableHead className="text-center">
                                    End Time
                                </TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((slot, index) => (
                                <AvailabilityHoursTableRow
                                    key={index}
                                    {...slot}
                                />
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <h3 className="text-sm italic">No time slots set</h3>
                )}
            </CardContent>
        </Card>
    );
};

export default AvailabilityHours;
