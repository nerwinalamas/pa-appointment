"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function signup(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.log("error message: ", error.message);
        return { succes: false, error: error.message };
    }

    revalidatePath("/register");
    return { success: true };
}
