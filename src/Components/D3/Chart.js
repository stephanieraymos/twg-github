import React, { useState } from "react";
import { scaleLinear, scaleTime, timeFormat, extent, scaleOrdinal } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import ReactDropdown from "react-dropdown";

const width = 1000;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 60;

const attributes = [
  { value: "cost", label: "Our Cost" },
  { value: "price", label: "Our Price" },
  { value: "retailPrice", label: "Retail Price" },
  { value: "program", label: "program" },
  { value: "date", label: "date" },
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

const ScatterPlot = () => {
  const data = useData();

  const initialXAttribute = "date";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = "cost";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  // const colorValue = (d) => d.species;
  const dateValue = (d) => d.date;

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // const xAxisTickFormat = timeFormat("%B %d, %Y");

  const xScale = scaleOrdinal().domain(
    data.map(dateValue)
  );
  // .rangeRoundBands([0, width], 0.1);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  // const colorScale = scaleOrdinal()
  //   .domain(data.map(colorValue))
  //   .range(["#e6842a", "#137b80", "#8e6c8a"]);

  return (
    <>
      <div className="sales-graph-container">
        <div className="sales-graph">
          <p className="sales-graph-date-range">{monthName} 2021 insights</p>
          <div className="menus-container">
            <span className="dropdown-label">X</span>
            <ReactDropdown
              options={attributes}
              value={xAttribute}
              onChange={({ value }) => setXAttribute(value)}
            />
            <span className="dropdown-label">Y</span>
            <ReactDropdown
              options={attributes}
              value={yAttribute}
              onChange={({ value }) => setYAttribute(value)}
            />
          </div>
          <div className="body-center">
            <svg width={width} height={height}>
              <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom
                  xScale={xScale}
                  innerHeight={innerHeight}
                  dateValue={dateValue}
                />
                <text
                  className="axis-label"
                  textAnchor="middle"
                  transform={`translate(${-yAxisLabelOffset},${
                    innerHeight / 2
                  }) rotate(-90)`}
                  tickOffset={5}
                >
                  {yAxisLabel}
                </text>
                <AxisLeft yScale={yScale} innerWidth={innerWidth} />
                <text
                  className="axis-label"
                  x={innerWidth / 2}
                  y={innerHeight + xAxisLabelOffset}
                  textAnchor="middle"
                  tickOffset={5}
                >
                  {xAxisLabel}
                </text>
                <Marks
                  data={data}
                  xScale={xScale}
                  xValue={xValue}
                  yScale={yScale}
                  yValue={yValue}
                  // colorScale={colorScale}
                  // colorValue={colorValue}
                  circleRadius={7}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScatterPlot;
