"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const reserveSlot = async (id: string, formData: FormData) => {
    const name = formData.get("name") as string;
    const contact_number = formData.get("contactNumber") as string;
    const deposit_screenshot = formData.get("depositScreenshot") as File;

    const supabase = await createClient();

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const extension = deposit_screenshot.name.split(".").pop();
    const filename = `${timestamp}.${extension}`;

    const { data: fileData, error: fileError } = await supabase
        .storage
        .from("deposit-images")    
        .upload(filename, deposit_screenshot);

    if (fileError) {
        return { success: false, message: "Failed to upload deposit screenshot" };
    }

    const { data: { publicUrl } } = supabase
        .storage
        .from("deposit-images")
        .getPublicUrl(fileData.path);

    const { data, error } = await supabase
        .from("slots")
        .update({
            name,
            contact_number,
            deposit_screenshot: publicUrl,
            is_booked: true
        })
        .eq("id", id)
        .single();

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath("/");
    return { success: true, data };
};
