import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";

export const getAppointmentSchedule = async (dateId: string, timeId: string) => {
    const supabase = await createClient();

    const { data: appointmentData, error: appointmentError } = await supabase
        .from("appointments")
        .select("*")
        .eq("id", dateId)
        .single();

    if (appointmentError) {
        console.log("Error getting appointment: ", appointmentError.message);
        return { success: false, error: appointmentError.message };
    }

    const { data: slotData, error: slotError } = await supabase
        .from("slots")
        .select("*")
        .eq("id", timeId)
        .single();

    if (slotError) {
        console.log("Error getting slot: ", slotError.message);
        return { success: false, error: slotError.message };
    }

    revalidatePath("/");
    return { success: true, appointment: appointmentData, slot: slotData };
};
