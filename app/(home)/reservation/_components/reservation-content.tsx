"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useReservation } from "@/hooks/useReservation";
import { userSchema } from "../_lib/schema";
import { reserveTimeSlot } from "../action";
import { ErrorMessage } from "../_types";
import ReservationPaymentMethod from "./reservation-payment-method";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import toast from "react-hot-toast";

const ReservationContent = () => {
    const {
        selectedDate,
        selectedTimeSlot,
        name,
        setName,
        contactNumber,
        setContactNumber,
        depositScreenshot,
        setDepositScreenshot,
        setDepositScreenshotLink
    } = useReservation();

    const [error, setError] = useState<ErrorMessage>({});
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            name,
            contactNumber,
            depositScreenshot,
        };

        const result = userSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            type ErrorKeys = keyof typeof formattedErrors;
            setError(
                Object.keys(formattedErrors).reduce((acc, key) => {
                    const typedKey = key as ErrorKeys;
                    acc[typedKey] = formattedErrors[typedKey]?.[0] || "";
                    return acc;
                }, {} as ErrorMessage)
            );
            return;
        }

        setError({});

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("contactNumber", contactNumber);
            if (depositScreenshot)
                formData.append("depositScreenshot", depositScreenshot);
            if (selectedDate) {
                formData.append("date", format(selectedDate, "MMMM dd, yyyy"));
            }
            if (selectedTimeSlot) {
                const timeSlotsArray = Array.isArray(selectedTimeSlot) ? selectedTimeSlot : [selectedTimeSlot];
                formData.append("timeSlots", JSON.stringify(timeSlotsArray));
            }

            const response = await reserveTimeSlot(formData);
            if (response.success) {
                toast.success("appointment created successfully.");
                setDepositScreenshotLink(response.data?.[0].deposit_screenshots)
                router.replace("/confirmation");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error in payment: ", error);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDepositScreenshot(e.target.files[0]);
        }
        setError((prev) => ({ ...prev, depositScreenshot: "" }));
    };

    const handleCancel = () => {
        router.replace("/");
    };

    return (
        <CardContent>
            <h2 className="text-xl font-semibold text-center mb-6">
                To reserve your slot on{" "}
                {selectedDate
                    ? format(selectedDate, "MMMM dd, yyyy")
                    : "the selected date"}
                , from {selectedTimeSlot?.start} to {selectedTimeSlot?.end} (
                {selectedDate
                    ? format(selectedDate, "EEEE")
                    : "the selected day"}
                ), kindly pay the required deposit.
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <ReservationPaymentMethod />

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Payment Information
                    </h3>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError((prev) => ({ ...prev, name: "" }));
                            }}
                            className={`${
                                error.name &&
                                "outline-double outline-2 outline-red-500"
                            }`}
                        />
                    </div>
                    {error.name && (
                        <p className="text-sm text-red-500">{error.name}</p>
                    )}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChange={(e) => {
                                setContactNumber(e.target.value);
                                setError((prev) => ({
                                    ...prev,
                                    contactNumber: "",
                                }));
                            }}
                            className={`${
                                error.contactNumber &&
                                "outline-double outline-2 outline-red-500"
                            }`}
                        />
                    </div>
                    {error.contactNumber && (
                        <p className="text-sm text-red-500">
                            {error.contactNumber}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="depositScreenshot">
                        Deposit Screenshots
                    </Label>
                    <Input
                        type="file"
                        id="depositScreenshot"
                        name="depositScreenshot"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={`${
                            error.depositScreenshot &&
                            "p-2 rounded-md outline-double outline-2 outline-red-500"
                        }`}
                    />
                </div>
                {error.depositScreenshot && (
                    <p className="text-sm text-red-500">
                        {error.depositScreenshot}
                    </p>
                )}
                <div className="flex flex-col space-y-2">
                    <Button type="submit">Submit</Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </CardContent>
    );
};

export default ReservationContent;
