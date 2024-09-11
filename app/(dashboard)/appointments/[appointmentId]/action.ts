"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const checkTimeIfExists = async (
    appointment_id: string,
    start_time: string,
    end_time: string
) => {
    const supabase = await createClient();

    const { data: existingSlots, error: checkError } = await supabase
        .from("slots")
        .select("start_time, end_time")
        .eq("appointment_id", appointment_id);

    if (checkError) {
        return { exists: true, error: checkError.message };
    }

    const newStartTime = start_time;
    const newEndTime = end_time;

    for (const slot of existingSlots) {
        const slotStartTime = slot.start_time.slice(0, 5);
        const slotEndTime = slot.end_time.slice(0, 5);

        if (newStartTime === slotStartTime && newEndTime === slotEndTime) {
            return {
                exists: true,
                error: "This time slot overlaps with an existing appointment",
            };
        }
    }

    return { exists: false };
};

export const createSlot = async (id: string, formData: FormData) => {
    const start_time = formData.get("startTime") as string;
    const end_time = formData.get("endTime") as string;

    const supabase = await createClient();

    const existenceCheck = await checkTimeIfExists(id, start_time, end_time);

    if (existenceCheck.exists) {
        return { success: false, error: existenceCheck.error };
    }

    const { data: appointmentData, error: appointmentError } = await supabase
        .from("appointments")
        .select("available_slots")
        .eq("id", id)
        .single();

    if (appointmentError) {
        return { success: false, error: appointmentError.message };
    }

    const { error: updateAppointmentError } = await supabase
        .from("appointments")
        .update({
            available_slots: appointmentData?.available_slots + 1,
        })
        .eq("id", id)
        .single();

    if (updateAppointmentError) {
        return { success: false, error: updateAppointmentError.message };
    }

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

export const updateSlot = async (
    slotId: string,
    appointment_id: string,
    formData: FormData
) => {
    const start_time = formData.get("startTime") as string;
    const end_time = formData.get("endTime") as string;

    const supabase = await createClient();

    const existenceCheck = await checkTimeIfExists(
        appointment_id,
        start_time,
        end_time
    );

    if (existenceCheck.exists) {
        return { success: false, error: existenceCheck.error };
    }

    const { data, error } = await supabase
        .from("slots")
        .update({
            start_time,
            end_time,
        })
        .eq("id", slotId)
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath(`/appointments/${appointment_id}`);
    return { success: true, data };
};

export const deleteSlot = async (appointmentId: string, slotId: string) => {
    const supabase = await createClient();

    const { data: appointmentData, error: appointmentError } = await supabase
        .from("appointments")
        .select("available_slots, booked_slots")
        .eq("id", appointmentId)
        .single();

    if (appointmentError) {
        return { success: false, error: appointmentError.message };
    }

    const { data: slotData, error: slotError } = await supabase
        .from("slots")
        .select("*")
        .eq("id", slotId)
        .single();

    if (slotError) {
        return { success: false, error: slotError.message };
    }

    if (slotData.is_booked) {
        const url = new URL(slotData.deposit_screenshot);
        const filePath = url.pathname.split("/").pop();

        const { error: errorImage } = await supabase.storage
            .from("deposit-images")
            .remove([`public/${filePath}`]);

        if (errorImage) {
            return { success: false, error: errorImage.message };
        }

        const { error: updateAppointmentError } = await supabase
            .from("appointments")
            .update({
                booked_slots: appointmentData.booked_slots - 1,
            })
            .eq("id", appointmentId)
            .single();

        if (updateAppointmentError) {
            return { success: false, error: updateAppointmentError.message };
        }
    } else {
        const { error: updateAppointmentError } = await supabase
            .from("appointments")
            .update({
                available_slots: appointmentData.available_slots - 1,
            })
            .eq("id", appointmentId)
            .single();

        if (updateAppointmentError) {
            return { success: false, error: updateAppointmentError.message };
        }
    }

    const { error } = await supabase.from("slots").delete().eq("id", slotId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath(`/appointments/${appointmentId}`);
    return { success: true };
};
