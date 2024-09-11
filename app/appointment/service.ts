import { createClient } from "@/utils/supabase/server";

export const getSlotCount = async (id: string) => {
    const supabase = await createClient();
    const { count, error } = await supabase
        .from("slots")
        .select("*", { count: "exact", head: true })
        .eq("appointment_id", id);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, count };
};
