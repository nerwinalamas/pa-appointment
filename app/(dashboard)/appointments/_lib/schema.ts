import { z } from "zod";

export const appointmentSchema = z.object({
    date: z
        .date()
        .or(z.string().transform((dateStr) => new Date(dateStr)))
        .refine((date) => !isNaN(date.getTime()), {
            message: "Required",
        }),
    timeSlots: z.object({
        start: z.string().min(1, { message: "Start time is required" }),
        end: z.string().min(1, { message: "End time is required" }),
    }),
    name: z.string().min(1, { message: "Required" }),
    contactNumber: z.string().min(1, { message: "Required" }),
    // depositScreenshot: z.instanceof(File, {
    //     message: "Required",
    // }),
});
