import { createClient } from "@/utils/supabase/server";

export const getAllReservations = async (page = 1, pageSize = 10) => {
    const supabase = createClient();

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error, count } = await supabase
        .from("reservations")
        .select("*", { count: "exact" })
        .range(start, end)
        .order("date", { ascending: true });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, data, count, page, pageSize };
};

export const isLoggedIn = async () => {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return { session };
};
