"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const reserveSlot = async (
    appointmentId: string,
    slotId: string,
    formData: FormData
) => {
    const name = formData.get("name") as string;
    const contact_number = formData.get("contactNumber") as string;
    const deposit_screenshot = formData.get("depositScreenshot") as File;

    const supabase = await createClient();

    const { data: appointmentData, error: appointmentError } = await supabase
        .from("appointments")
        .select("available_slots, booked_slots")
        .eq("id", appointmentId)
        .single();

    if (appointmentError) {
        return { success: false, error: appointmentError.message };
    }

    const { error: updateAppointmentError } = await supabase
        .from("appointments")
        .update({
            available_slots: appointmentData.available_slots - 1,
            booked_slots: appointmentData.booked_slots + 1,
        })
        .eq("id", appointmentId)
        .single();

    if (updateAppointmentError) {
        return { success: false, error: updateAppointmentError.message };
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const extension = deposit_screenshot.name.split(".").pop();
    const filename = `${timestamp}.${extension}`;

    const { data: fileData, error: fileError } = await supabase.storage
        .from("deposit-images")
        .upload(`public/${filename}`, deposit_screenshot);

    if (fileError) {
        return {
            success: false,
            message: "Failed to upload deposit screenshot",
        };
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from("deposit-images").getPublicUrl(fileData.path);

    const { data, error } = await supabase
        .from("slots")
        .update({
            name,
            contact_number,
            deposit_screenshot: publicUrl,
            is_booked: true,
        })
        .eq("id", slotId)
        .single();

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath("/");
    return { success: true, data };
};
