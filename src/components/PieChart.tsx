import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { PieDiagram } from "../types";



// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 }
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieChartComponentProps {
    data: PieDiagram['data']
}
const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    
  
    console.log('piirakkaan tuleva data:', data)
    return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
export default PieChartComponent

// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { PieDiagram } from '../types'

// interface PieChartComponentProps {
//     data: PieDiagram['data'];
// }

// const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
//     const COLORS = ['#0088FE', '#00C49F'];
//     console.log('piechartista')

//     return (
//         <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//                 <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={150}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//             </PieChart>
//         </ResponsiveContainer>
//     );
// };

// export default PieChartComponent;