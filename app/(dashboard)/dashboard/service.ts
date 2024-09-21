import { createClient } from "@/utils/supabase/server";

export const getAllBookingsWithAppointmentDate = async (page = 1, pageSize = 10) => {
    const supabase = await createClient();

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error, count } = await supabase
        .from("slots")
        .select("*, appointments(date)", { count: "exact" })
        .eq("is_booked", true)
        .range(start, end)
        .order("appointments(date)", { ascending: false })
        .order("start_time", { ascending: false });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data, count, page, pageSize };
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
