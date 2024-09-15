"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "./actions";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Logout = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);
        
        try {
            const response = await logout();
            if (response.success) {
                toast.success("Successfully logged out!");
                router.replace("/appointment");
            } else {
                toast.error(`${response.error}`);
            }
        } catch (error) {
            toast.error("Error in Logout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="submit"
            variant="secondary"
            onClick={handleSubmit}
            disabled={loading}
            className="hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
        >
            {loading ? "Loading..." : "Logout"}
        </Button>
    );
};

export default Logout;
