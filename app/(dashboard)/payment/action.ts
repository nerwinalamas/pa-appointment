"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updatePaymentDetails = async (
    paymentDetailsId: string,
    formData: FormData
) => {
    const account_name = formData.get("accountName") as string;
    const contact_number = formData.get("contactNumber") as string;
    const amount = formData.get("amount") as string;

    const supabase = createClient();

    const { data: paymentDetailsData, error: paymentDetailsError } =
        await supabase
            .from("payment_details")
            .select("*")
            .eq("id", paymentDetailsId)
            .single();

    if (paymentDetailsError) {
        console.log(
            "Error fetching payment details: ",
            paymentDetailsError.message
        );
        return { success: false, error: paymentDetailsError.message };
    }

    const updatePaymentDetails = {
        account_name: account_name || paymentDetailsData.account_name,
        contact_number: contact_number || paymentDetailsData.contact_number,
        amount: parseInt(amount) || paymentDetailsData.amount,
    };

    const {
        data: updatedPaymentDetailsData,
        error: updatedPaymentDetailsError,
    } = await supabase
        .from("payment_details")
        .update(updatePaymentDetails)
        .eq("id", paymentDetailsId)
        .single();

    if (updatedPaymentDetailsError) {
        console.log(
            "Error updating payment details: ",
            updatedPaymentDetailsError.message
        );
        return { success: false, error: updatedPaymentDetailsError.message };
    }

    revalidatePath("/payment");
    return { success: true, data: updatedPaymentDetailsData };
};
