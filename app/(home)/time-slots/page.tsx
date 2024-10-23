import { getAllTimeSlots } from "@/app/(dashboard)/availability/service";
import TimeSlotsBackButton from "./_components/time-slots-back-button";
import TimeSlotsTableTow from "./_components/time-slots-table-row";
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

const TimeSlots = async () => {
    const { data, error } = await getAllTimeSlots();

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-96 mx-auto">
                <TimeSlotsBackButton />
                <CardHeader>
                    <CardTitle>Select Your Time Slot</CardTitle>
                    <CardDescription>
                        Choose an available time for your appointment
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">
                                    Start Time
                                </TableHead>
                                <TableHead className="text-center">
                                    End Time
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.map((slot) => (
                                    <TimeSlotsTableTow
                                        key={slot.id}
                                        {...slot}
                                    />
                                ))
                            ) : (
                                <h3 className="text-sm italic">
                                    No time slots available
                                </h3>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default TimeSlots;
