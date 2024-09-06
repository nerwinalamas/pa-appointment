"use client";

import Link from "next/link";
import { login } from "./actions";
import { useState } from "react";

const Login = () => {
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-80 p-5 rounded-lg flex flex-col gap-5 text-slate-900 bg-slate-100">
                <h1 className="text-center text-xl font-semibold">pa-Appointment</h1>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm cursor-pointer">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Email"
                        className="p-2"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="password"
                        className="text-sm cursor-pointer"
                    >
                        Password
                    </label>
                    <input
                        type={isPasswordShowing ? "text" : "password"}
                        name="password"
                        id="password"
                        required
                        placeholder="Password"
                        className="p-2"
                    />
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            id="showPassword"
                            className="cursor-pointer"
                            checked={isPasswordShowing}
                            onChange={(e) =>
                                setIsPasswordShowing(e.target.checked)
                            }
                        />
                        <label
                            htmlFor="showPassword"
                            className="text-sm cursor-pointer"
                        >
                            Show password
                        </label>
                    </div>
                </div>

                <button
                    formAction={login}
                    className="p-2 font-semibold bg-slate-900 text-slate-100"
                >
                    Login
                </button>
                <div className="w-full flex justify-center gap-2 text-sm">
                    <p>Don&apos;t have an account?</p>
                    <Link
                        href="/register"
                        className="hover:underline text-blue-500"
                    >
                        <p>Register</p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
