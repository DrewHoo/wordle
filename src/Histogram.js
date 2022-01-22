import { Typography } from "@mui/material";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function Histogram({ letter, counts, domain }) {
  const data = Object.entries(counts).map(([index, value]) => ({
    name: index,
    value,
  }));
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <div style={{ display: "flex", alignItems: "baseline" }}>
      <Typography sx={{ color: "#8884d8", fontSize: "1.5rem" }}>
        {letter}
      </Typography>
      {/* <BarChart barGap={1} width={50} height={30} data={data}> */}
      <BarChart barGap={1} width={100} height={50} data={data}>
        {/* <Legend align="left" iconSize="0" width={10} height={15}/> */}
        <YAxis domain={[0, domain]} hide />
        <Bar name={letter} dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
    // </ResponsiveContainer>
  );
}
