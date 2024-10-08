"use client";

import { Button } from "@/components/ui/button";
import { useStaffModal } from "@/hooks/useStaffModal";

const StaffCreateButton = () => {
    const { onOpen } = useStaffModal();
    return (
        <Button
            variant="secondary"
            onClick={() => onOpen("addStaff")}
            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
        >
            Add
        </Button>
    );
};

export default StaffCreateButton;
