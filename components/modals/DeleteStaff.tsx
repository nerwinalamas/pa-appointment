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

const DeleteStaff = () => {
    const { isOpen, onClose, type } = useStaffModal();
    const isModalOpen = isOpen && type === "deleteStaff";

    const handleDialogChange = () => {
        onClose();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // const response = await 
            // if (response.success) {
            //     toast.success("Delete staff successfully");
            //     onClose();
            // } else {
            //     toast.error(`${response.error}`);
            // }
        } catch (error) {
            console.log("Error deleting staff: ", error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent>
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
