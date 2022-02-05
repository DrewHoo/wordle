import { Typography } from "@mui/material";
import React from "react";
import { BarChart, Bar, YAxis } from "recharts";

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
