"use client";

import { FormEvent, useEffect, useState } from "react";
import { updateUser } from "../action";
import { User } from "../_types";

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

const AccountSettingsAccountInformation = ({ user }: { user: User }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || "");
            setLastName(user.last_name || "");
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user.id) return;

        try {
            const formData = new FormData();
            if (firstName) formData.append("first_name", firstName);
            if (lastName) formData.append("last_name", lastName);

            const response = await updateUser(user.id, formData);
            if (response.success) {
                toast.success("Update account successful.");
            } else {
                toast.error("Failed to update account.");
            }
        } catch (error) {
            console.log("Error updating account: ", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Account Information</CardTitle>
                <CardDescription>
                    Change your account details here
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="secondary"
                        className="md:w-max hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                    >
                        Update Account
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AccountSettingsAccountInformation;
