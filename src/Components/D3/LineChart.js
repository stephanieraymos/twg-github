import React, { useState } from "react";
import { scaleLinear, scaleTime, timeFormat, extent } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import Dropdown from "./Dropdown";

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const LineChart = () => {
  const data = useData();
  const initialXAttribute = "sold";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = "Date";

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const attributes = [
    { value: "sold", label: "Date Sold" },
    { value: "cost", label: "Our Cost" },
    { value: "price", label: "Our Price" },
    { value: "retail_price", label: "Retail Price" },
    { value: "program", label: "program" },
  ];

  const yValue = (d) => d.cost;
  const yAxisLabel = "Sales";

  const xAxisTickFormat = timeFormat("%a");

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <div>
        <label for="x-select">Change x value:</label>
        <Dropdown
          options={attributes}
          id="x-select"
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={6}
            />
            <text
              className="axis-label"
              textAnchor="middle"
              transform={`translate(${-yAxisLabelOffset},${
                innerHeight / 2
              }) rotate(-90)`}
            >
              {yAxisLabel}
            </text>
            <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
            >
              {xAxisLabel}
            </text>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={3}
            />
          </g>
        </svg>
      </div>
    </>
  );
};
export default LineChart;
