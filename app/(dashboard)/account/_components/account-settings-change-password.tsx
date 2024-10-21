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
import { updatePassword } from "../action";

const AccountSettingsChangePassword = ({ user }: { user: User }) => {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
        }
    }, [user]);

    const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) return;
        if (newPassword !== confirmPassword) return;

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("currentPassword", currentPassword);
            formData.append("newPassword", newPassword);

            const response = await updatePassword(formData);
            if (response.success) {
                toast.success("Update password successful.");
            } else {
                toast.error("Failed to update password.");
            }
        } catch (error) {
            console.log("Error updating password: ", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleChangePassword}
                    className="flex flex-col gap-3"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="currentPassword">
                            Current Password
                        </Label>
                        <Input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="confirmPassword">
                            Confirm New Password
                        </Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="secondary"
                        className="md:w-max hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                    >
                        Change Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AccountSettingsChangePassword;
