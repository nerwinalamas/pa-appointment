"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStaffModal } from "@/hooks/useStaffModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/app/(dashboard)/account/_types";
import toast from "react-hot-toast";
import { createStaff } from "@/app/(dashboard)/staff/action";
import { getAllUsers } from "@/app/(dashboard)/staff/serviceClient";

const AddStaff = () => {
    const { isOpen, onClose, type } = useStaffModal();
    const isModalOpen = isOpen && type === "addStaff";

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            const response = await getAllUsers();

            if (response.error) {
                console.log("Error fetching users: ", response.error);
            } else {
                if (Array.isArray(response.data)) {
                    if (isMounted) {
                        setUsers(response.data);
                        setFilteredUsers(response.data);
                    }
                } else {
                    if (isMounted) {
                        console.log("No users found or data is not an array.");
                        setUsers([]);
                        setFilteredUsers([]);
                    }
                }
            }
        };

        if (isModalOpen) {
            getUsers();
        }

        return () => {
            isMounted = false;
        };
    }, [isModalOpen]);

    useEffect(() => {
        const filtered = users.filter((user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const handleUserSelection = (user: User) => {
        setSelectedUsers((prev) =>
            prev.includes(user)
                ? prev.filter((u) => u.id !== user.id)
                : [...prev, user]
        );
    };

    const handleDialogChange = () => {
        onClose();
    };

    const handleAddStaff = async (staff: User[]) => {
        try {
            const response = await createStaff(staff);
            if (response.success) {
                toast.success("Staff added successfully.");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error adding staff: ", error);
            toast.error("Something went wrong.");
        } finally {
            onClose();
            setSearchTerm("");
            setSelectedUsers([]);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Staff Members</DialogTitle>
                    <DialogDescription>
                        Search and select users from the list below to add them
                        as staff members.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 mb-4">
                    <Input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                </div>
                <ScrollArea className="max-h-[300px] rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] sticky top-0 bg-background">
                                    Select
                                </TableHead>
                                <TableHead className="sticky top-0 bg-background">
                                    Email
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.includes(
                                                user
                                            )}
                                            onCheckedChange={() =>
                                                handleUserSelection(user)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
                <DialogFooter>
                    <Button
                        onClick={() => handleAddStaff(selectedUsers)}
                        disabled={selectedUsers.length === 0}
                    >
                        Add Selected Staff Members
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddStaff;
