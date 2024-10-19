"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useStaffModal } from "@/hooks/useStaffModal";
import { Staff } from "@/app/(dashboard)/staff/_types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateStaff } from "@/app/(dashboard)/staff/action";
import toast from "react-hot-toast";

const UpdateStaff = () => {
    const { isOpen, onClose, type, data } = useStaffModal();
    const isModalOpen = isOpen && type === "updateStaff";

    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (data && isModalOpen) {
            if (typeof data !== "string") {
                setRole(data.role || "");
                setStatus(data.status || "");
            }
        }
    }, [isModalOpen, data]);

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data) return;
        const staffData = data as Staff;

        try {
            const response = await updateStaff(staffData.id as string, {
                ...staffData,
                role,
                status,
            });
            if (response.success) {
                toast.success("Staff updated successfully!");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error updating staff: ", error);
            toast.error("Something went wrong.");
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Update Staff</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select onValueChange={setRole} defaultValue={role}>
                            <SelectTrigger>
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent className="capitalize">
                                <SelectItem value="user">user</SelectItem>
                                <SelectItem value="admin">admin</SelectItem>
                                <SelectItem value="super admin">
                                    super admin
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={setStatus} defaultValue={status}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="capitalize">
                                <SelectItem value="active">active</SelectItem>
                                <SelectItem value="inactive">
                                    inactive
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateStaff;
