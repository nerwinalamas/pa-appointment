"use server";

import { createClient } from "@/utils/supabase/server";

export const updateUser = async (userId: string, formData: FormData) => {
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;

    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

    if (userError) {
        console.log("Error fetching user: ", userError?.message);
        return { success: false, error: userError.message };
    }

    const updateUser = {
        first_name: first_name || userData.first_name,
        last_name: last_name || userData.last_name,
    };

    const { data: updatedUserData, error: updatedUserError } = await supabase
        .from("users")
        .update(updateUser)
        .eq("id", userId)
        .single();

    if (updatedUserError) {
        console.log("Error updating user: ", updatedUserError?.message);
        return { success: false, error: updatedUserError.message };
    }

    return { success: true, data: updatedUserData };
};
