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

export const updateAppointment = async (
    appointmentId: string,
    formData: FormData
) => {
    const date = formData.get("date") as string;
    const time_slots = formData.get("timeSlots") as string;
    const name = formData.get("name") as string;
    const contact_number = formData.get("contactNumber") as string;
    const deposit_screenshot = formData.get("depositScreenshot") as File | null;
    let publicUrl: string | null = null;

    const supabase = await createClient();

    const { data: appointmentData, error: appointmentError } = await supabase
        .from("reservations")
        .select("*")
        .eq("id", appointmentId)
        .single();

    if (appointmentError) {
        console.log("Error fetching appointment: ", appointmentError.message);
        return { success: false, error: appointmentError.message };
    }

    if (deposit_screenshot) {
        if (appointmentData.deposit_screenshots) {
            const url = new URL(appointmentData.deposit_screenshots);
            const filePath = url.pathname.split("/").pop();

            const { error: errorImage } = await supabase.storage
                .from("deposit-images")
                .remove([`public/${filePath}`]);

            if (errorImage) {
                console.error("Error deleting image:", errorImage.message);
                return { success: false, error: errorImage.message };
            }
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
                error: "Failed to upload deposit screenshot",
            };
        }

        const {
            data: { publicUrl: uploadedUrl },
        } = supabase.storage.from("deposit-images").getPublicUrl(fileData.path);

        publicUrl = uploadedUrl;
    }

    const updateAppointment = {
        date: date ?? appointmentData.date,
        time_slots: time_slots
            ? JSON.parse(time_slots)
            : appointmentData.time_slots,
        name: name ?? appointmentData.name,
        contact_number: contact_number ?? appointmentData.contact_number,
        deposit_screenshots: publicUrl ?? appointmentData.deposit_screenshot,
    };

    const { data, error } = await supabase
        .from("reservations")
        .update(updateAppointment)
        .eq("id", appointmentId)
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/appointments");
    return { success: true, data };
};

export const deleteAppointment = async (appointmentId: string) => {
    const supabase = await createClient();

    const { data: appointmentData, error: appointmentError } = await supabase
        .from("reservations")
        .select("*")
        .eq("id", appointmentId)
        .single();

    if (appointmentError) {
        console.error("Error fetching appointment:", appointmentError.message);
        return { success: false, error: appointmentError.message };
    }

    const url = new URL(appointmentData.deposit_screenshots);
    const filePath = url.pathname.split("/").pop();

    const { error: errorImage } = await supabase.storage
        .from("deposit-images")
        .remove([`public/${filePath}`]);

    if (errorImage) {
        console.error("Error deleting image:", errorImage.message);
        return { success: false, error: errorImage.message };
    }

    const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", appointmentId);

    if (error) {
        console.error("Error deleting appointment:", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/appointments");
    return { success: true };
};
