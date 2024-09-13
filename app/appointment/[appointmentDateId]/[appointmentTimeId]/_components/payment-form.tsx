"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { reserveSlot } from "../action";
import { userSchema } from "../_lib/schema";
import { ErrorMessage } from "../_lib/type";

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:w-96">
            <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold">Payment Information</h3>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError((prev) => ({ ...prev, name: "" }));
                        }}
                        className="p-3 rounded-md text-slate-800 outline-none"
                    />
                </div>
                {error.name && (
                    <p className="text-sm text-red-500">{error.name}</p>
                )}
                <div className="flex flex-col gap-2">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
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
                        className="p-3 rounded-md text-slate-800 outline-none"
                    />
                </div>
                {error.contactNumber && (
                    <p className="text-sm text-red-500">
                        {error.contactNumber}
                    </p>
                )}
                <div className="flex flex-col gap-2">
                    <label htmlFor="depositScreenshot">
                        Deposit Screenshots
                    </label>
                    <input
                        type="file"
                        id="depositScreenshot"
                        name="depositScreenshot"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                {error.depositScreenshot && (
                    <p className="text-sm text-red-500">
                        {error.depositScreenshot}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="w-full p-3 rounded-md font-semibold bg-slate-100 text-slate-800 hover:bg-opacity-80"
            >
                Submit
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="w-full p-3 rounded-md font-semibold text-slate-100 hover:bg-slate-900"
            >
                Cancel
            </button>
        </form>
    );
};

export default PaymentForm;
