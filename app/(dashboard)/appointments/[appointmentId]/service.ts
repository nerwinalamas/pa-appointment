import { createClient } from "@/utils/supabase/server";

export const getAllSlotsDashboard = async (dateId: string) => {
    const supabase = await createClient();

    const { data, error, count } = await supabase
        .from("slots")
        .select("*", { count: "exact" })
        .eq("appointment_id", dateId)
        .order("start_time", { ascending: true });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data, count };
};

export const getAppointmentDateById = async (dateId: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("id", dateId)
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data };
};
