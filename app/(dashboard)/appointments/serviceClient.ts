import { createClient } from "@/utils/supabase/client";

export const getAllTimeSlots = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("time_slots")
        .select("*")
        .order("start_time");

    if (error) {
        console.log("Error fetching time slots: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};