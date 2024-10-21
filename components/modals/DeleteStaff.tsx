import { FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStaffModal } from "@/hooks/useStaffModal";
import toast from "react-hot-toast";
import { deleteStaff } from "@/app/(dashboard)/staff/action";
import { Staff } from "@/app/(dashboard)/staff/_types";

const DeleteStaff = () => {
    const { isOpen, onClose, type, data } = useStaffModal();
    const isModalOpen = isOpen && type === "deleteStaff";

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!data) return;
        const staffData = data as Staff;

        try {
            const response = await deleteStaff(staffData.id as string);
            if (response.success) {
                toast.success("Staff deleted successfully.");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error deleting staff: ", error);
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Delete Staff</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <p>Are you sure you want to delete this staff?</p>
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDialogChange}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteStaff;
