"use client";

import { useState } from "react";

const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState("gcash");

    return (
        <div className="flex flex-col gap-1 md:w-96">
            <div className="flex flex-col gap-1 p-5 text-sm rounded-md text-slate-800 bg-slate-300">
                <p>
                    Name: <span className="font-semibold">John Doe</span>
                </p>
                <p>
                    Contact Number:{" "}
                    <span className="font-semibold">09123456789</span>
                </p>
                <p>
                    Amount: <span className="font-semibold">P10</span>
                </p>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">Payment Method</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        id="gcash"
                        name="paymentMethod"
                        value="gcash"
                        checked={paymentMethod === "gcash"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="gcash" className="text-sm">
                        Gcash
                    </label>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
