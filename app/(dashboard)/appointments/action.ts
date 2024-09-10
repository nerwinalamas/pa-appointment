"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createAppointment = async (formData: FormData) => {
    const date = formData.get("date") as string;

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
