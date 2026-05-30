"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "20 Mei", visitor: 1200 },
  { name: "21 Mei", visitor: 1300 },
  { name: "22 Mei", visitor: 1180 },
  { name: "23 Mei", visitor: 1600 },
  { name: "24 Mei", visitor: 900 },
  { name: "25 Mei", visitor: 1150 },
  { name: "26 Mei", visitor: 1500 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="visitor"
          stroke="#0f766e"
          fill="#0f766e"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}