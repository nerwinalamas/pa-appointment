import { getAllUnavailableDates } from "../service";
import AvailabilityDatesCard from "./availability-dates-card";
import AvailabilityDatesAddButton from "./availability-dates-add-button";
import AvailabilityError from "./availability-error";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AvailabilityDates = async () => {
    const { data, error } = await getAllUnavailableDates();

    if (error) {
        console.log("Error in Unavailable Dates: ", error);
        return <AvailabilityError name="Unavailable Dates" className="h-60" />;
    }

    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle>Unavailable Dates</CardTitle>
                <CardDescription>
                    Manage dates when you are unavailable
                </CardDescription>
            </CardHeader>
            <AvailabilityDatesAddButton />
            <CardContent className="flex flex-wrap gap-3">
                {data && data.length > 0 ? (
                    data.map((date) => (
                        <AvailabilityDatesCard key={date.id} {...date} />
                    ))
                ) : (
                    <h3 className="text-sm italic">No unavailable date set</h3>
                )}
            </CardContent>
        </Card>
    );
};

export default AvailabilityDates;
