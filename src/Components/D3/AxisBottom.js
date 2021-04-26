export const AxisBottom = ({ xScale, innerHeight, tickOffset = 3 }) => {
  //Tick offset defaults to 3 incase the value is not passed in
  return xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)}, 0)`}
    >
      <line y2={innerHeight} />
      <text
        dy=".71em"
        style={{ textAnchor: "middle" }}
        y={innerHeight + tickOffset}
      >
        {tickValue}
      </text>
    </g>
  ));
};

// export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
//   xScale.ticks().map(tickValue => (
//     <g
//       className="tick"
//       key={tickValue}
//       transform={`translate(${xScale(tickValue)},0)`}
//     >
//       <line y2={innerHeight} />
//       <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + tickOffset}>
//         {tickFormat(tickValue)}
//       </text>
//     </g>
//   ));
