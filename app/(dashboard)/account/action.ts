"use server";

import { createClient } from "@/utils/supabase/server";
import { serviceRole } from "@/utils/supabase/serviceRole";
import { revalidatePath } from "next/cache";

export const updateUser = async (userId: string, formData: FormData) => {
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;

    const supabase = createClient();

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

    revalidatePath("/account");
    return { success: true, data: updatedUserData };
};

export const updatePassword = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (signInError) {
        console.log("error message: ", signInError.message);
        return { succes: false, error: signInError.message };
    }

    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (updateError) {
        console.log("Error updating password: ", updateError.message);
        return { success: false, error: updateError.message };
    }

    revalidatePath("/account");
    return { success: true };
};

// BLOCKERS: NEED NG DOMAIN SABI SA RESEND
// {
//     "name": "validation_error",
//     "message": "The gmail.com domain is not verified. Please, add and verify your domain on https://resend.com/domains",
//     "statusCode": 403
// }
export const updateEmail = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const newEmail = formData.get("newEmail") as string;

    const supabase = createClient();

    const { data, error: signInError } = await supabase.auth.signInWithPassword(
        {
            email,
            password,
        }
    );

    if (signInError) {
        console.log("error message: ", signInError.message);
        return { success: false, error: signInError.message };
    }

    const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail,
    });

    if (updateError) {
        console.log("Error updating email from auth: ", updateError.message);
        return { success: false, error: updateError.message };
    }

    const userData = {
        email: newEmail || data.user.email,
    };

    const { error: usersError } = await supabase
        .from("users")
        .update(userData)
        .eq("id", data.user.id)
        .single();

    if (usersError) {
        console.log("Error updating email in users table: ", usersError.message);
        return { success: false, error: usersError.message };
    }

    revalidatePath("/account");
    return { success: true };
};

export const deleteAccount = async (userId: string) => {
    const supabase = serviceRole();

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
        console.log("Error deleting account from auth: ", error.message);
        return { success: false, error: error.message };
    }

    const { error: usersError } = await supabase
        .from("users")
        .delete()
        .eq("id", userId)
        .single();

    if (usersError) {
        console.log("Error deleting account in users table: ", usersError.message);
        return { success: false, error: usersError.message };
    }

    revalidatePath("/account");
    return { success: true };
};
