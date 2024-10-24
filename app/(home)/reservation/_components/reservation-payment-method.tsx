"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getPaymentDetails } from "@/app/(dashboard)/payment/service";
import { PaymentDetails } from "@/app/(dashboard)/payment/_types";

const ReservationPaymentMethod = () => {
    const [, setPaymentMethod] = useState("gcash");
    const [data, setData] = useState<PaymentDetails[]>([]);

    useEffect(() => {
        let isMounted = true;

        const getPaymentMethod = async () => {
            const response = await getPaymentDetails();

            if (response.error) {
                console.log("Error fetching payment details: ", response.error);
            } else {
                if (Array.isArray(response.data)) {
                    if (isMounted) {
                        setData(response.data);
                    }
                } else {
                    if (isMounted) {
                        console.log(
                            "No payment details found or data is not an array."
                        );
                        setData([]);
                    }
                }
            }
        };

        getPaymentMethod();

        return () => {
            isMounted = false;
        };
    }, []);

    const accountName = data[0]?.account_name || "";
    const contactNumber = data[0]?.contact_number || "";
    const amount = data[0]?.amount ? `P${data[0].amount.toFixed(2)}` : "";

    return (
        <>
            <div className="bg-secondary p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="accountName">Name</Label>
                        <Input id="accountName" value={accountName} readOnly />
                    </div>
                    <div>
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input id="contactNumber" value={contactNumber} readOnly />
                    </div>
                    <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" value={amount} readOnly />
                    </div>
                </div>
            </div>
            <div>
                <Label className="text-base">Payment Method</Label>
                <RadioGroup
                    defaultValue="gcash"
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-1 mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gcash" id="gcash" />
                        <Label htmlFor="gcash">GCash</Label>
                    </div>
                </RadioGroup>
            </div>
        </>
    );
};

export default ReservationPaymentMethod;
