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
import { useEffect, useState } from "react";

const AccountSettingsChangeEmail = ({ user }: { user: User }) => {
    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
    }, [user]);

    const handleChangeEmail = () => {};
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
                        <Label htmlFor="currentEmail">Current Email</Label>
                        <Input
                            type="text"
                            id="currentEmail"
                            name="currentEmail"
                            placeholder="Current Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="newEmail">New Email</Label>
                        <Input
                            type="text"
                            id="newEmail"
                            name="newEmail"
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
