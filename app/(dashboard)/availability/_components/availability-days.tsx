import { getAllDays } from "../service";
import AvailabilityDaysCard from "./availability-days-card";
import AvailabilityError from "./availability-error";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AvailabilityDays = async () => {
    const { data, error } = await getAllDays();

    if (error) {
        console.log("Error in Unavailable Days: ", error);
        return <AvailabilityError name="Unavailable Days" />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Unavailable Days</CardTitle>
                <CardDescription>
                    Select the days you are unavailable for appointments
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                {data && data.length > 0 ? (
                    data.map((day) => (
                        <AvailabilityDaysCard key={day.id} {...day} />
                    ))
                ) : (
                    <h3 className="text-sm italic col-span-2">No unavailable days set</h3>
                )}
            </CardContent>
        </Card>
    );
};

export default AvailabilityDays;
