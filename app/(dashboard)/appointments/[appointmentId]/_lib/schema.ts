import { z } from "zod";

export const slotSchema = z.object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
});
