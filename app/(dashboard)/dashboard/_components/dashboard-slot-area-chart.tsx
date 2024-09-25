"use client";

import { chartConfig } from "../_lib/chartConfig";
import { chartData } from "../_lib/constant";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const DashboardSlotAreaChart = () => {
    return (
        <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 row-span-2 md:col-span-2">
            <ChartContainer config={chartConfig} className="h-full">
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
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                        dataKey="availableSlots"
                        type="natural"
                        fill="var(--color-availableSlots)"
                        fillOpacity={0.4}
                        stroke="var(--color-availableSlots)"
                        stackId="a"
                    />
                    <Area
                        dataKey="booking"
                        type="natural"
                        fill="var(--color-booking)"
                        fillOpacity={0.4}
                        stroke="var(--color-booking)"
                        stackId="a"
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    );
};

export default DashboardSlotAreaChart;
