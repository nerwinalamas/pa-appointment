"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log("error message: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/appointments");
    return { success: true };
}
