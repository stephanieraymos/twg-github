import React, { useState } from "react";
import { scaleLinear, scaleTime, timeFormat, extent } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import Dropdown from "./Dropdown";

const width = 1000;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 60;

const attributes = [
  { value: "cost", label: "Our Cost" },
  { value: "price", label: "Our Price" },
  { value: "retail_price", label: "Retail Price" },
  { value: "program", label: "program" },
];
//^ GETTING CURRENT MONTH
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();
const monthName = months[d.getMonth()]; // "July" (or current month)

// FUNCTION TO GET LABEL
const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

const LineChart = () => {
  const data = useData();

  const xValue = (d) => monthName;
  const xAxisLabel = "Date";

  const initialYAttribute = "cost";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = timeFormat("%B %d, %Y");

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
      <div className="sales-graph-container">
        <div className="sales-graph">
          <p className="sales-graph-date-range">{monthName} 2021 insights</p>
          <div className="dropdown-container">

            <label htmlFor="y-select">Y:</label>
            <Dropdown
              options={attributes}
              id="y-select"
              selectedValue={yAttribute}
              onSelectedValueChange={setYAttribute}
            />
          </div>
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
              <AxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                tickOffset={5}
              />
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
      </div>
    </>
  );
};
export default LineChart;
