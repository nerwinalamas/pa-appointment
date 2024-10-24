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
import { AlertCircle } from "lucide-react";

const TimeSlots = async () => {
    const { data, error } = await getAllTimeSlots();

    if (error) {
        return (
            <div className="min-h-screen flex flex-col gap-3 items-center justify-center">
                <Card className="w-96 h-96 mx-auto">
                    <CardContent className="h-full flex flex-col gap-1 items-center justify-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <AlertCircle className="h-16 w-16 text-red-500" />
                            <p className="text-lg font-medium text-center">
                                Unable to Load Time Slots
                            </p>
                            <p className="text-sm text-gray-400 text-center">
                                We{"'"}re having trouble fetching the available
                                time slots. Please try again later or contact
                                support if the problem persists.
                            </p>
                            <div className="w-full mt-4 flex items-center justify-center">
                                <TimeSlotsBackButton />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
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
