import { z } from "zod";

export const holidaySchema = z.object({
    date: z.string().min(1, "Required"),
    name: z.string().min(1, "Required"),
});

export const timeSlotSchema = z.object({
    startTime: z.string().min(1, "Required"),
    endTime: z.string().min(1, "Required"),
});
