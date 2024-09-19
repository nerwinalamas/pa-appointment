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

export const getAllTotalBookings = async () => { 
    const supabase = await createClient();

    const { count, error } = await supabase
        .from("slots")
        .select("*", { count: "exact", head: true})
        .eq("is_booked", true);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, count };
}

export const getAllTotalSlots = async () => { 
    const supabase = await createClient();

    const { count, error } = await supabase
        .from("slots")
        .select("*", { count: "exact", head: true});

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, count };
}
