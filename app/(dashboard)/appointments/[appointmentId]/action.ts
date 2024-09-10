"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createSlot = async (id: string, formData: FormData) => {
    const start_time = formData.get("startTime") as string;
    const end_time = formData.get("endTime") as string;

    const supabase = await createClient();
    const { data, error } = await supabase.from("slots").insert({
        start_time,
        end_time,
        appointment_id: id,
        name: null,
        contact_number: null,
        deposit_screenshot: null,
    });

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath(`/appointments/${id}`);
    return { success: true, data };
};

export const updateSlot = async (id: string, formData: FormData) => {
    const start_time = formData.get("startTime") as string;
    const end_time = formData.get("endTime") as string;

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("slots")
        .update({
            start_time,
            end_time,
        })
        .eq("id", id)
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath(`/appointments/${id}`);
    return { success: true, data };
};

export const deleteSlot = async (id: string) => {
    const supabase = await createClient();
    const { error } = await supabase
        .from("slots")
        .delete()
        .eq("id", id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath(`/appointments/${id}`);
    return { success: true };
};
