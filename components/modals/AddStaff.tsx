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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStaffModal } from "@/hooks/useStaffModal";
import { ScrollArea } from "../ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { User } from "@/app/(dashboard)/account/_types";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { createStaff } from "@/app/(dashboard)/staff/action";

const AddStaff = () => {
    const supabase = createClient();

    const { isOpen, onClose, type } = useStaffModal();
    const isModalOpen = isOpen && type === "addStaff";

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const { data, error } = await supabase.from("users").select("*");

            if (error) {
                console.log("Error fetching users: ", error.message);
            } else {
                setUsers(data);
                setFilteredUsers(data);
            }
        };
        getUsers();
    }, [supabase, isModalOpen]);

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
