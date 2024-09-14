"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    return (
        <Button type="button" variant="secondary" onClick={() => router.back()}>
            Back
        </Button>
    );
};

export default BackButton;
