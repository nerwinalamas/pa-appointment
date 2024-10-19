"use client";

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
import { User } from "../_types";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountSettingsChangeEmail = ({ user }: { user: User }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
    }, [user]);

    const handleChangeEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) return;

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("newEmail", newEmail);

            // const response = await updateEmail(formData);
            // if (response.success) {
            //     toast.success("Update email successful.");
            // } else {
            //     toast.error("Failed to update email.");
            // }
            toast.success("This feature is under development");
        } catch (error) {
            console.log("Error updating email: ", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Email</CardTitle>
                <CardDescription>Update your email address</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleChangeEmail}
                    className="flex flex-col gap-3"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Current Email</Label>
                        <Input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Current Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Confirm Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="newEmail">New Email</Label>
                        <Input
                            type="text"
                            id="newEmail"
                            name="newEmail"
                            placeholder="New Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="secondary"
                        className="md:w-max hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                    >
                        Change Email
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AccountSettingsChangeEmail;
