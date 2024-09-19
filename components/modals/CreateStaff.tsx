"use client"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStaffModal } from "@/hooks/useStaffModal";
import { ErrorState } from "@/app/(dashboard)/staff/_types";

const CreateStaff = () => {
    const { isOpen, onClose, type } = useStaffModal();
    const isModalOpen = isOpen && type === "createStaff";

    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState<ErrorState>({});

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Staff</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError((prev) => ({ ...prev, name: "" }));
                        }}
                        className="p-2 rounded-md font-medium border bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
                    />
                    {error.name && (
                        <p className="text-sm text-red-500">{error.name}</p>
                    )}
                    <Label htmlFor="contact_number">Contact Number</Label>
                    <Input
                        type="text"
                        id="contact_number"
                        name="contact_number"
                        value={contactNumber}
                        onChange={(e) => {
                            setContactNumber(e.target.value);
                            setError((prev) => ({ ...prev, contact_number: "" }));
                        }}
                        className="p-2 rounded-md font-medium border bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
                    />
                    {error.contact_number && (
                        <p className="text-sm text-red-500">{error.contact_number}</p>
                    )}
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError((prev) => ({ ...prev, email: "" }));
                        }}
                        className="p-2 rounded-md font-medium border bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
                    />
                    {error.email && (
                        <p className="text-sm text-red-500">{error.email}</p>
                    )}
                    <Label htmlFor="role">Role</Label>
                    <Input
                        type="text"
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);
                            setError((prev) => ({ ...prev, role: "" }));
                        }}
                        className="p-2 rounded-md font-medium border bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
                    />
                    {error.role && (
                        <p className="text-sm text-red-500">{error.role}</p>
                    )}
                    <Label htmlFor="status">Status</Label>
                    <Input
                        type="text"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setError((prev) => ({ ...prev, status: "" }));
                        }}
                        className="p-2 rounded-md font-medium border bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50"
                    />
                    {error.status && (
                        <p className="text-sm text-red-500">{error.status}</p>
                    )}
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateStaff;
