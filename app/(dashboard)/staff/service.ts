import { createClient } from "@/utils/supabase/server";

export const getAllStaff = async (page = 1, pageSize = 10) => {
    const supabase = createClient();

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error, count } = await supabase
        .from("staff")
        .select("*", { count: "exact" })
        .range(start, end);

    if (error) {
        console.log("Error fetching staff: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data, count };
};
