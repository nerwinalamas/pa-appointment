"use client";

import { FormEvent, useState } from "react";

const PaymentInformation = () => {
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("gcash");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col gap-2 p-4">
            <h1 className="text-2xl text-center">
                To reserve your slot on{" "}
                <span className="font-semibold">September 6, 2024</span>, from{" "}
                <span className="font-semibold">08:00 to 09:00 (Friday)</span>,
                kindly pay the required deposit.
            </h1>
            <div className="flex flex-col gap-1 p-5 font-semibold text-sm rounded-md text-slate-800 bg-slate-300">
                <p>Name: John Doe</p>
                <p>Contact Number: 09123456789</p>
                <p>Amount: P10</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold">Payment Method:</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="gcash"
                            name="paymentMethod"
                            value="gcash"
                            checked={paymentMethod === "gcash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label
                            htmlFor="gcash"
                            className="text-sm font-semibold"
                        >
                            Gcash
                        </label>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold">
                        Payment Information:
                    </h3>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-semibold">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
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
                            Contact Number:
                        </label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="p-3 rounded-md text-slate-800"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="depositScreenshots"
                            className="text-sm font-semibold"
                        >
                            Deposit Screenshots:
                        </label>
                        <input
                            type="file"
                            id="depositScreenshots"
                            name="depositScreenshots"
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
                    className="w-full p-3 rounded-md font-semibold bg-slate-100 text-slate-800"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default PaymentInformation;
