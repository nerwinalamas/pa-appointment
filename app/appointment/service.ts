import { createClient } from "@/utils/supabase/server";

export const getAppointmentsWithSlotCount = async () => {
    const supabase = await createClient();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString().slice(0, 10);

    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    const lastDayISO = lastDayOfMonth.toISOString().slice(0, 10);

    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .gte("date", todayISO)
        .lte("date", lastDayISO)
        .order("date", { ascending: true });

    if (error) {
        return { success: false, error: error.message };
    }

    const appointmentsWithSlotCount = await Promise.all(
        data.map(async (appointment) => {
            const { count, error } = await supabase
                .from("slots")
                .select("id", { count: "exact", head: true })
                .eq("appointment_id", appointment.id);

            if (error) {
                return { ...appointment, slotCount: 0 };
            }

            return { ...appointment, slotCount: count };
        })
    );

    return { success: true, data: appointmentsWithSlotCount };
};
