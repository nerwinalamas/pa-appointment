import { getAllHolidays } from "../service";
import AvailabilityHolidaysCard from "./availability-holidays-card";
import AvailabilityHolidaysForm from "./availability-holidays-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AvailabilityHolidays = async () => {
    const { data, error } = await getAllHolidays();

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Holidays</CardTitle>
                <CardDescription>
                    Manage holidays and special dates when you are unavailable
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                    {data && data.length > 0 ? (
                        data.map((holiday) => (
                            <AvailabilityHolidaysCard
                                key={holiday.id}
                                {...holiday}
                            />
                        ))
                    ) : (
                        <h3 className="text-sm italic">
                            No holidays or special dates added
                        </h3>
                    )}
                </div>
                <AvailabilityHolidaysForm />
            </CardContent>
        </Card>
    );
};

export default AvailabilityHolidays;
