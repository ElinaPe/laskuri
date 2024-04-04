import { Slider } from "@mui/material";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";



interface BarItem {
  value: number;
  name: string;
  id?: string;
}

interface Entry {
  name: string;
  [key: string]: string | number; 
}

interface GrowthRate {
  value: number;
  min: number;
  max: number;
  marks: { value: number; label: string }[];
}

interface Diagram {
  xAxisDatakey: Array<{ name: string }>;
  barDataKey: BarItem[];
  growthRate: GrowthRate;
}

interface BarChartBarProps {
  diagram: Diagram;
}

const BarChartBar: React.FC<BarChartBarProps> = ({ diagram }) => {

  const [growthRate, setGrowthRate] = useState(1);


  const convertDiagramData = (diagram: Diagram): Entry[] => {
    // Muunnetaan growthRate prosentista kertoimeksi
    const growthMultiplier = growthRate
    
    return diagram.xAxisDatakey.map((xAxisItem, index) => {
      const entry: Entry = { name: xAxisItem.name };
      diagram.barDataKey.forEach((barItem) => {
        switch (index) {
          case 0: 
            entry[barItem.name] = barItem.value;
            break;
          case 1: 
            entry[barItem.name] = barItem.value * growthMultiplier;
            break;
          case 2: 
            entry[barItem.name] = barItem.value * growthMultiplier * growthMultiplier;
            break;
          default:
            entry[barItem.name] = barItem.value;
            break;
        }
      });
      return entry;
    });
  };
  const diagramData = convertDiagramData(diagram);

    

const handleGrowthRateChange = (event: Event, newValue: number | number[]) => {
  setGrowthRate(Array.isArray(newValue) ? newValue[0] : newValue);
};


  return (
    <div>
      <ResponsiveContainer width="90%" aspect={1.5}>
        <BarChart data={diagramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(diagramData[0] || {}).filter(key => key !== 'name').map((dataKey, index) => (
            <Bar key={index} dataKey={dataKey} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <Slider
        step={0.1}
        min={diagram.growthRate.min}
        max={diagram.growthRate.max}
        value={growthRate}
        onChange={handleGrowthRateChange}
        valueLabelDisplay="auto"
        aria-labelledby="input-slider"
        marks={diagram.growthRate.marks}
      />
    </div>
  );
}

export default BarChartBar