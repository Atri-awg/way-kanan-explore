"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mobile", value: 65 },
  { name: "Desktop", value: 28 },
  { name: "Tablet", value: 7 },
];

const COLORS = [
  "#0f766e",
  "#eab308",
  "#3b82f6",
];

export default function DeviceChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}