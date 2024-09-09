"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { reserveSlot } from "../action";

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

    const router = useRouter();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDepositScreenshot(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!depositScreenshot) {
            console.log("Error: No deposit screenshot uploaded");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("contactNumber", contactNumber);
            formData.append("depositScreenshot", depositScreenshot);

            const reponse = await reserveSlot(
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
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">Payment Information</h3>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-semibold">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 rounded-md text-slate-800"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="contactNumber"
                        className="text-sm font-semibold"
                    >
                        Contact Number
                    </label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="p-3 rounded-md text-slate-800"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="depositScreenshot"
                        className="text-sm font-semibold"
                    >
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
            </div>
            <button
                type="submit"
                className="w-full p-3 rounded-md font-semibold bg-slate-100 text-slate-800"
            >
                Submit
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="w-full p-3 rounded-md font-semibold bg-slate-100 text-slate-800"
            >
                Cancel
            </button>
        </form>
    );
};

export default PaymentForm;
