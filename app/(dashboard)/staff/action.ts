"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { User } from "../account/_types";
import { Staff } from "./_types";

export const createStaff = async (staff: User[]) => {
    const supabase = createClient();

    const staffData = staff.map((s) => ({
        user_id: s.id,
        first_name: s.first_name,
        last_name: s.last_name,
        email: s.email,
        role: s.role,
    }));

    const { error } = await supabase.from("staff").insert(staffData).single();

    if (error) {
        console.log("Error creating staff: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/staff");
    return { success: true };
};

export const updateStaff = async (staffId: string, staff: Staff) => {
    const supabase = createClient();

    const { data: staffData, error: staffError } = await supabase
        .from("staff")
        .select("*")
        .eq("id", staffId)
        .single();

    if (staffError) {
        console.log("Error fetching staff: ", staffError.message);
        return { success: false, error: staffError.message };
    }

    const staffUpdatedData = {
        role: staff.role ?? staffData.role,
        status: staff.status ?? staffData.status,
    };

    const { error } = await supabase
        .from("staff")
        .update(staffUpdatedData)
        .eq("id", staffId)
        .single();

    if (error) {
        console.log("Error updating staff: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/staff");
    return { success: true };
};

export const deleteStaff = async (staffId: string) => {
    const supabase = createClient();

    const { error } = await supabase
        .from("staff")
        .delete()
        .eq("id", staffId)
        .single();

    if (error) {
        console.log("Error deleting staff: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/staff");
    return { success: true };
};
