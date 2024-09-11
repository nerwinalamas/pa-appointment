import { createClient } from "@/utils/supabase/server";

export const getAllSlotsDashboard = async (dateId: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("slots")
        .select("*")
        .eq("appointment_id", dateId)
        .order("start_time", { ascending: true });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data };
};
