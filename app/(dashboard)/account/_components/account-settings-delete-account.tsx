"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { User } from "../_types";

const AccountSettingsDeleteAccount = ({ user }: { user: User }) => {
    const handleDeleteAccount = () => {};

    console.log("user: ", user);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                    Permanently remove your account and all data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <p>This action is irreversible. Please be certain.</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AccountSettingsDeleteAccount;
