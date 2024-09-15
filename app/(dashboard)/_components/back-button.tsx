"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const BackButton = () => {
    const router = useRouter();
    return (
        <Button type="button" variant="secondary" onClick={() => router.back()} className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700">
            Back
        </Button>
    );
};

export default BackButton;
