"use client"
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

interface ChartData {
  week: string
  products: number
}

const ProductChart = ({ data }: { data: ChartData[] }) => {
  return (
    <div className='h-48 w-full'>
      <ResponsiveContainer>
        <AreaChart data={data}>
          {/* X-axis with week labels */}
          <XAxis dataKey="week" />

          {/* Y-axis with label */}
          <YAxis label={{ value: 'Products', angle: -90, position: 'insideLeft' }} />

          {/* Tooltip on hover */}
          <Tooltip />

          {/* Area with dots and labels */}
          <Area
            type="monotone"
            dataKey="products"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.5}
            dot={{ r: 4, stroke: "#8884d8", strokeWidth: 2, fill: "white" }}
          >
            {/* Show product numbers above each dot */}
            {/* <LabelList dataKey="products" position="top" /> */}
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProductChart
