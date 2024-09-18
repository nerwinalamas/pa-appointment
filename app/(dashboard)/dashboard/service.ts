import { createClient } from "@/utils/supabase/server";

export const getAllBookingsWithAppointmentDate = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("slots")
        .select("*, appointments(date)")
        .eq("is_booked", true)
        .order("appointments(date)", { ascending: false })
        .order("start_time", { ascending: false });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data };
};
