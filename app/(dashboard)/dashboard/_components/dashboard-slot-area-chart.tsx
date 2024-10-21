"use client";

import { chartConfig } from "../_lib/chartConfig";
import { TARGET_BOOKINGS } from "../_lib/constant";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

type ChartData = {
    month: string;
    booking: number;
};

const DashboardSlotAreaChart = ({ chartData }: { chartData: ChartData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <ChartContainer config={chartConfig}>
                <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}`}
                        domain={[0, TARGET_BOOKINGS]}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                        dataKey="booking"
                        type="natural"
                        fill="var(--color-booking)"
                        fillOpacity={0.4}
                        stroke="var(--color-booking)"
                    />
                </AreaChart>
            </ChartContainer>
        </ResponsiveContainer>
    );
};

export default DashboardSlotAreaChart;
