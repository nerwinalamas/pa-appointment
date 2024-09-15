"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "./actions";
import { schema } from "../_lib/schema";
import { ErrorState } from "../_types";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShowing, setIsPasswordShowing] = useState(false);
    const [error, setError] = useState<ErrorState>({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = schema.safeParse({ email, password });

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            type ErrorKeys = keyof typeof formattedErrors;
            setError(
                Object.keys(formattedErrors).reduce((acc, key) => {
                    const typedKey = key as ErrorKeys;
                    acc[typedKey] = formattedErrors[typedKey]?.[0] || "";
                    return acc;
                }, {} as ErrorState)
            );
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            const response = await login(formData);
            if (response.success) {
                toast.success("Login successfully");
                router.replace("/appointments");
            } else {
                toast.error(`${response.error}`);
                console.log("Error in Login: ", error);
            }
        } catch (error) {
            console.log("Error in Login: ", error);
        } finally {
            setEmail("");
            setPassword("");
            setError({});
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <form
                onSubmit={handleSubmit}
                className="w-80 p-5 rounded-lg flex flex-col gap-5 shadow-sm border text-slate-900 bg-slate-50"
            >
                <h1 className="text-center text-xl font-bold">Login</h1>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError((prev) => ({
                                ...prev,
                                email: "",
                            }));
                        }}
                        className={`${
                            error.email &&
                            "outline-double outline-2 outline-red-500"
                        }`}
                    />
                    {error.email && (
                        <p className="text-sm text-red-500">{error.email}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type={isPasswordShowing ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError((prev) => ({
                                ...prev,
                                password: "",
                            }));
                        }}
                        className={`${
                            error.password &&
                            "outline-double outline-2 outline-red-500"
                        }`}
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
                    {error.password && (
                        <p className="text-sm text-red-500">{error.password}</p>
                    )}
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </Button>
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
