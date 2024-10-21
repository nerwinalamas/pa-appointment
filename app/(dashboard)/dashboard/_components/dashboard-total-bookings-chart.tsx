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

const DashboardTotalBookingsChart = ({ count }: { count: number }) => {
    return (
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
                <RadialBar dataKey="visitors" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                                            {count}
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
    );
};

export default DashboardTotalBookingsChart;
