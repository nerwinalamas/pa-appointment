"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowUp, TrendingUp } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";

const chartData = [
    { month: "January", booking: 186, availableSlots: 80 },
    { month: "February", booking: 305, availableSlots: 200 },
    { month: "March", booking: 237, availableSlots: 120 },
    { month: "April", booking: 73, availableSlots: 190 },
    { month: "May", booking: 209, availableSlots: 130 },
    { month: "June", booking: 214, availableSlots: 140 },
];

const chartConfig = {
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

const chartData2 = [
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];

const Dashboard = () => {
    return (
        <div className="p-4 grid gap-4 grid-rows-10 md:grid-rows-8 md:grid-cols-2 xl:grid-rows-4 xl:grid-cols-4">
            <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950">
                <h2 className="text-base font-light">Bookings</h2>
                <p className="text-xl font-bold">50</p>
                <div className="flex items-center gap-1 text-green-500">
                    <ArrowUp size={18} strokeWidth={2} />
                    <p>10.4%</p>
                </div>
                <p className="text-xs text-slate-700">for this month</p>
            </div>
            <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950">
                <h2 className="text-base font-light">Available Slots</h2>
                <p className="text-xl font-bold">50</p>
                <div className="flex items-center gap-1 text-green-500">
                    <ArrowUp size={18} strokeWidth={2} />
                    <p>10.4%</p>
                </div>
                <p className="text-xs text-slate-700">for today</p>
            </div>
            <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 xl:row-start-2">
                <h2 className="text-base font-light">Total Slots</h2>
                <p className="text-xl font-bold">50</p>
                <div className="flex items-center gap-1 text-green-500">
                    <ArrowUp size={18} strokeWidth={2} />
                    <p>10.4%</p>
                </div>
                <p className="text-xs text-slate-700">for this month</p>
            </div>
            <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 xl:row-start-2">
                <h2 className="text-base font-light">Total Sales</h2>
                <p className="text-xl font-bold">50</p>
                <div className="flex items-center gap-1 text-green-500">
                    <ArrowUp size={18} strokeWidth={2} />
                    <p>10.4%</p>
                </div>
                <p className="text-xs text-slate-700">for this month</p>
            </div>
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
            <div className="flex flex-col gap-1 p-4 rounded-md bg-slate-100 dark:bg-slate-950 row-span-2 md:col-span-2 xl:col-span-3">
                <Table className="p-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell>$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
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
        </div>
    );
};

export default Dashboard;
