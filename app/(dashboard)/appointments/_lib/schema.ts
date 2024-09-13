import { z } from "zod";

export const appointmentSchema = z.object({
    date: z.date().or(z.string().transform((dateStr) => new Date(dateStr))),
});
