"use server";

import { createClient } from "@/utils/supabase/server";

export const getUser = async (userId: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data };
};
