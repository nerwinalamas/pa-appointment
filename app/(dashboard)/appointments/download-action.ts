"use server";

import { createClient } from "@/utils/supabase/server";

export const downloadData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("reservations").select("*");

    if (error) {
        console.error("Error downloading data:", error);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};
