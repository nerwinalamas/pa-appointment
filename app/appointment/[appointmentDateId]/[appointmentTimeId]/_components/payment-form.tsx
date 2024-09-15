"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { reserveSlot } from "../action";
import { userSchema } from "../_lib/schema";
import { ErrorMessage } from "../_lib/type";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PaymentForm = ({
    appointmentDateId,
    appointmentTimeId,
}: {
    appointmentDateId: string;
    appointmentTimeId: string;
}) => {
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [depositScreenshot, setDepositScreenshot] = useState<File | null>(
        null
    );
    const [error, setError] = useState<ErrorMessage>({});

    const router = useRouter();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDepositScreenshot(e.target.files[0]);
        }
        setError((prev) => ({ ...prev, depositScreenshot: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
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

            const reponse = await reserveSlot(
                appointmentDateId as string,
                appointmentTimeId as string,
                formData
            );

            if (reponse.success) {
                router.push(
                    `/appointment/${appointmentDateId}/${appointmentTimeId}/schedule`
                );
                console.log("Slot reserve successfully: ", reponse.data);
            } else {
                console.log("Error in payment: ", reponse.message);
            }
        } catch (error) {
            console.log("Error in payment: ", error);
        }
    };

    const handleCancel = () => {
        router.replace("/");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-3 md:w-96"
        >
            <div className="flex flex-col gap-3">
                <h3 className="text-base font-semibold">Payment Information</h3>
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
                <div className="flex flex-col gap-2">
                    <Label htmlFor="depositScreenshot">
                        Deposit Screenshots
                    </Label>
                    <input
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
            </div>
            <Button type="submit" className="bg-slate-950 text-slate-100 hover:bg-slate-700 focus:bg-slate-200">
                Submit
            </Button>
            <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                className="bg-slate-100 text-slate-950 hover:bg-slate-200 focus:bg-slate-200"
            >
                Cancel
            </Button>
        </form>
    );
};

export default PaymentForm;
