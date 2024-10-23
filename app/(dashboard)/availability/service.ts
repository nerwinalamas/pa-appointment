import { createClient } from "@/utils/supabase/server";

export const getAllDays = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("days")
        .select("*")
        .order("created_at");

    if (error) {
        console.log("Error fetching days: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};

export const getAllUnavailableDates = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("dates")
        .select("*")
        .order("created_at");

    if (error) {
        console.log("Error fetching unavailable dates: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};

export const getAllHolidays = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("holidays")
        .select("*")
        .order("date");

    if (error) {
        console.log("Error fetching holidays: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};

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

export const getAllMonths = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("months")
        .select("*")
        .order("created_at");

    if (error) {
        console.log("Error fetching months: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};
