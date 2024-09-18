import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
    booking: {
        label: "Booking",
        color: "hsl(var(--chart-1))",
    },
    availableSlots: {
        label: "Available Slots",
        color: "hsl(var(--chart-2))",
    },
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;
