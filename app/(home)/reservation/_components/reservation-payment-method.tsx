"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ReservationPaymentMethod = () => {
    const [, setPaymentMethod] = useState("gcash");

    return (
        <>
            <div className="bg-secondary p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" readOnly />
                    </div>
                    <div>
                        <Label htmlFor="contact">Contact Number</Label>
                        <Input
                            id="contact"
                            defaultValue="09123456789"
                            readOnly
                        />
                    </div>
                    <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" defaultValue="P10.00" readOnly />
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
