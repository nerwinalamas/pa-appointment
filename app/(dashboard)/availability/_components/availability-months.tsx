import { getAllMonths } from "../service";
import AvailabilityMonthsCard from "./availability-months-card";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AvailabilityMonths = async () => {
    const { data, error } = await getAllMonths();

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Unavailable Months</CardTitle>
                <CardDescription>
                    Select the months you want to disable for appointments
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {data && data.length > 0 ? (
                    data.map((day) => (
                        <AvailabilityMonthsCard key={day.id} {...day} />
                    ))
                ) : (
                    <h3 className="text-sm italic col-span-2">
                        No disabled months set
                    </h3>
                )}
            </CardContent>
        </Card>
    );
};

export default AvailabilityMonths;
