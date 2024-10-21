"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const reserveTimeSlot = async (formData: FormData) => {
    const date = formData.get("date") as string;
    const time_slots = formData.get("timeSlots") as string;
    const name = formData.get("name") as string;
    const contact_number = formData.get("contactNumber") as string;
    const deposit_screenshot = formData.get("depositScreenshot") as File | null;
    let publicUrl: string | null = null;

    const supabase = await createClient();

    if (deposit_screenshot) {
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

    const reservationData = {
        date,
        time_slots: JSON.parse(time_slots),
        name,
        contact_number,
        deposit_screenshots: publicUrl,
    };

    const { data, error } = await supabase
        .from("reservations")
        .insert(reservationData)
        .select();

    if (error) {
        console.log("Error creating reservation: ", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/");
    return { success: true, data };
};
