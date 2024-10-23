"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updateDays = async (dayId: string) => {
    const supabase = createClient();

    const { data: dayData, error: dayError } = await supabase
        .from("days")
        .select("is_unavailable")
        .eq("id", dayId)
        .single();

    if (dayError) {
        console.log("Error fetching day: ", dayError.message);
        return { success: false, error: dayError.message };
    }

    const { data, error } = await supabase
        .from("days")
        .update({
            is_unavailable: !dayData.is_unavailable,
        })
        .eq("id", dayId)
        .single();

    if (error) {
        console.log("Error updating day: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true, data };
};

export const createTimeSlot = async (formData: FormData) => {
    const start_time = formData.get("startTime") as string;
    const end_time = formData.get("endTime") as string;

    const supabase = createClient();

    const { error } = await supabase.from("time_slots").insert({
        start_time,
        end_time,
    });

    if (error) {
        console.log("Error creating time slot: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true };
};

export const deleteTimeSlot = async (timeSlotId: string) => {
    const supabase = createClient();

    const { error } = await supabase
        .from("time_slots")
        .delete()
        .eq("id", timeSlotId)
        .single();

    if (error) {
        console.log("Error deleting time slot: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true };
};

export const createUnavailableDate = async (formData: FormData) => {
    const date = formData.get("date") as string;

    const supabase = createClient();

    const { error } = await supabase.from("dates").insert({
        date,
    });

    if (error) {
        console.log("Error creating unavailable date: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true };
};

export const deleteUnavailableDate = async (unavailableDateId: string) => {
    const supabase = createClient();

    const { error } = await supabase
        .from("dates")
        .delete()
        .eq("id", unavailableDateId)
        .single();

    if (error) {
        console.log("Error deleting unavailable date: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true };
};

export const createHoliday = async (formData: FormData) => {
    const date = formData.get("date") as string;
    const name = formData.get("name") as string;

    const supabase = createClient();

    const { error } = await supabase.from("holidays").insert({
        date,
        name,
    });

    if (error) {
        console.log("Error creating holiday: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true };
};

export const deleteHoliday = async (holidayId: string) => {
    const supabase = createClient();

    const { error } = await supabase
        .from("holidays")
        .delete()
        .eq("id", holidayId)
        .single();

    if (error) {
        console.log("Error deleting holiday: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true };
};

export const updateMonths = async (monthId: string) => { 
    const supabase = createClient();

    const { data: monthData, error: monthError } = await supabase
        .from("months")
        .select("is_unavailable")
        .eq("id", monthId)
        .single();

    if (monthError) {
        console.log("Error fetching months: ", monthError.message);
        return { success: false, error: monthError.message };
    }

    const { data, error } = await supabase
        .from("months")
        .update({
            is_unavailable: !monthData.is_unavailable,
        })
        .eq("id", monthId)
        .single();

    if (error) {
        console.log("Error updating month: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/availability");
    return { success: true, data };
}
