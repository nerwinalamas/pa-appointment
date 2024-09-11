"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const checkDateIfExists = async (date: string) => {
    const supabase = await createClient();

    const { data: existingAppointment, error: checkError } = await supabase
        .from("appointments")
        .select("*")
        .eq("date", date)
        .single();

    if (checkError && checkError.code !== "PGRST116") {
        return { exists: true, error: checkError.message };
    }

    if (existingAppointment) {
        return {
            exists: true,
            error: "An appointment for this date already exists",
        };
    }

    return { exists: false };
};

export const createAppointment = async (formData: FormData) => {
    const date = formData.get("date") as string;

    const existenceCheck = await checkDateIfExists(date);
    
    if (existenceCheck.exists) {
        return { success: false, error: existenceCheck.error };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from("appointments").insert({
        date,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/appointments");
    return { success: true, data };
};

export const updateAppointment = async (id: string, formData: FormData) => {
    const date = formData.get("date") as string;

    const existenceCheck = await checkDateIfExists(date);
    
    if (existenceCheck.exists) {
        return { success: false, error: existenceCheck.error };
    }

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("appointments")
        .update({
            date,
        })
        .eq("id", id)
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/appointments");
    return { success: true, data };
};

export const deleteAppointment = async (id: string) => {
    const supabase = await createClient();
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/appointments");
    return { success: true };
};
