import AvailabilityDays from "./_components/availability-days";
import AvailabilityMonths from "./_components/availability-months";
import AvailabilityDates from "./_components/availability-dates";
import AvailabilityHolidays from "./_components/availability-holidays";
import AvailabilityHours from "./_components/availability-hours";

const Availability = () => {
    return (
        <div className="flex flex-col gap-2 pt-5 pb-20 lg:pb-12 lg:gap-4 lg:mx-auto xl:m-4 xl:pt-0">
            <AvailabilityDays />
            <AvailabilityMonths />
            <AvailabilityDates />
            <AvailabilityHolidays />
            <AvailabilityHours />
        </div>
    );
};

export default Availability;
