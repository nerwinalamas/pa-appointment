"use client";

import { chartConfig } from "../_lib/chartConfig";
import { chartData2 } from "../_lib/constant";

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const DashboardTotalBookingsChart = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 row-span-2 md:col-span-2 xl:col-span-1">
            <ChartContainer
                config={chartConfig}
                className="h-full mx-auto aspect-square max-h-[250px]"
            >
                <RadialBarChart
                    data={chartData2}
                    startAngle={0}
                    endAngle={250}
                    innerRadius={80}
                    outerRadius={110}
                >
                    <PolarGrid
                        gridType="circle"
                        radialLines={false}
                        stroke="none"
                        className="first:fill-muted last:fill-background"
                        polarRadius={[86, 74]}
                    />
                    <RadialBar
                        dataKey="visitors"
                        background
                        cornerRadius={10}
                    />
                    <PolarRadiusAxis
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (
                                    viewBox &&
                                    "cx" in viewBox &&
                                    "cy" in viewBox
                                ) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-4xl font-bold"
                                            >
                                                {chartData2[0].visitors.toLocaleString()}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                Bookings
                                            </tspan>
                                        </text>
                                    );
                                }
                            }}
                        />
                    </PolarRadiusAxis>
                </RadialBarChart>
            </ChartContainer>
            <div className="flex flex-col items-center justify-center gap-2 text-sm">
                <h3 className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                </h3>
                <p className="leading-none text-muted-foreground">
                    Showing total visitors for this month
                </p>
            </div>
        </div>
    );
};

export default DashboardTotalBookingsChart;
