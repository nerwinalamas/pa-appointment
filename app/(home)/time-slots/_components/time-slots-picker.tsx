"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useReservation } from "@/hooks/useReservation";

type TimeSlot = {
    start: string;
    end: string;
};

const timeSlots: TimeSlot[] = [
    { start: "08:00 AM", end: "09:00 AM" },
    { start: "09:00 AM", end: "10:00 AM" },
    { start: "10:00 AM", end: "11:00 AM" },
    { start: "11:00 AM", end: "12:00 PM" },
    { start: "01:00 PM", end: "02:00 PM" },
    { start: "02:00 PM", end: "03:00 PM" },
    { start: "03:00 PM", end: "04:00 PM" },
    { start: "04:00 PM", end: "05:00 PM" },
];

const TimeSlotsPicker = () => {
    const { selectedTimeSlot, setSelectedTimeSlot } = useReservation();
    const router = useRouter();

    const handleSlotSelection = (slot: TimeSlot) => {
        setSelectedTimeSlot(slot);
        router.push(`/reservation?start=${slot.start}&end=${slot.end}`);
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="text-primary"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {timeSlots.map((slot) => (
                        <Button
                            key={slot.start}
                            variant={
                                selectedTimeSlot === slot
                                    ? "default"
                                    : "outline"
                            }
                            className={`h-auto py-4 ${
                                selectedTimeSlot === slot
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground"
                            }`}
                            onClick={() => handleSlotSelection(slot)}
                        >
                            <div className="text-center">
                                <div className="font-semibold">
                                    {slot.start}
                                </div>
                                <div className="text-xs">to</div>
                                <div className="font-semibold">{slot.end}</div>
                            </div>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default TimeSlotsPicker;
