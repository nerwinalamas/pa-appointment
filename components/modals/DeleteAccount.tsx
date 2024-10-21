import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAccountModal } from "@/hooks/useAccountModal";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { deleteAccount } from "@/app/(dashboard)/account/action";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
    const { isOpen, onClose, type, data } = useAccountModal();
    const isModalOpen = isOpen && type === "deleteAccount";

    const router = useRouter();
    const [confirmText, setConfirmText] = useState("");

    const handleDialogChange = () => {
        onClose();
    };

    const handleDelete = async (userId: string) => {
        try {
            const response = await deleteAccount(userId);
            if (response.success) {
                toast.success("Delete account successfully!");
                router.replace("/login");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            console.log("Error deleting account: ", error);
            toast.error("Something went wrong.");
        } finally {
            onClose();
            setConfirmText("");
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-destructive flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Delete Account
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="confirm" className="text-right">
                            Confirm
                        </Label>
                        <Input
                            id="confirm"
                            className="col-span-3"
                            placeholder="Type 'DELETE' to confirm"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleDialogChange}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleDelete(data?.id as string)}
                        disabled={confirmText !== "DELETE"}
                    >
                        Delete Account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccount;
