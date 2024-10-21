"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useReservation } from "@/hooks/useReservation";
import { FileCheck } from "lucide-react";
import { format } from "date-fns";

const Confirmation = () => {
    const {
        selectedDate,
        selectedTimeSlot,
        name,
        contactNumber,
        depositScreenshotLink,
    } = useReservation();
    const router = useRouter();

    const handleGoHome = () => {
        router.replace("/calendar");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl text-center">
                            APPOINTMENT SCHEDULE
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-semibold">Date:</div>
                            <div>
                                {format(selectedDate as Date, "MMMM dd, yyyy")}
                            </div>
                            <div className="font-semibold">Time:</div>
                            <div>
                                {selectedTimeSlot?.start} to{" "}
                                {selectedTimeSlot?.end}
                            </div>
                            <div className="font-semibold">Name:</div>
                            <div className="capitalize">{name}</div>
                            <div className="font-semibold">Contact number:</div>
                            <div>{contactNumber}</div>
                            <div className="font-semibold">Deposit:</div>
                            <div>P10.00</div>
                            <div className="font-semibold">
                                Payment Screenshot:
                            </div>
                            <div>
                                {depositScreenshotLink && (
                                    <Link
                                        href={depositScreenshotLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FileCheck className="h-5 w-5 text-green-500" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button variant="link" onClick={handleGoHome}>
                            Go back to home page
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Confirmation;
