"use client";

import { FormEvent, useEffect, useState } from "react";
import { PaymentDetails as PaymentDetailsProps } from "../_types";
import { updatePaymentDetails } from "../action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";

const PaymentDetails = ({ data }: { data: PaymentDetailsProps[] }) => {
    const [accountName, setAccountName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [amount, setAmount] = useState<number | "">("");

    useEffect(() => {
        if (data && data.length > 0) {
            setAccountName(data[0].account_name || "");
            setContactNumber(data[0].contact_number || "");
            setAmount(
                data[0].amount !== undefined ? Number(data[0].amount) : ""
            );
        }
    }, [data]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data[0].id) return;

        try {
            const formData = new FormData();
            if (accountName) formData.append("accountName", accountName);
            if (contactNumber) formData.append("contactNumber", contactNumber);
            if (amount) formData.append("amount", String(amount));

            const response = await updatePaymentDetails(data[0].id, formData);
            if (response.success) {
                toast.success("Update payment details successful.");
            } else {
                toast.error("Failed to update payment details.");
            }
        } catch (error) {
            console.log("Error updating payment details: ", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Payment Details</CardTitle>
                <CardDescription>
                    Change your payment details here
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input
                            type="text"
                            id="accountName"
                            name="accountName"
                            placeholder="Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Amount"
                            value={amount === "" ? "" : amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                setAmount(value ? Number(value) : "");
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="secondary"
                        className="md:w-max hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                    >
                        Update Payment Details
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PaymentDetails;
