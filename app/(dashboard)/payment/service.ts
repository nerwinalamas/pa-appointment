"use server";

import { createClient } from "@/utils/supabase/server";

export const getPaymentDetails = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from("payment_details").select("*");

    if (error) {
        console.log("Error fetching payment details: ", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
};
