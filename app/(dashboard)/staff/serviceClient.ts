import { createClient } from "@/utils/supabase/client";

export const getAllUsers = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        console.log("Error fetching users: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};