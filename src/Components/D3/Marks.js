// import { line, curveNatural } from "d3";
// export const Marks = ({
//   data,
//   xScale,
//   yScale,
//   xValue,
//   yValue,
//   tooltipFormat,
//   circleRadius,
// }) => (
//   <>
//     <g className="marks">
//       <path
//         fill="none"
//         stroke="black"
//         d={line()
//           .x((d) => xScale(xValue(d)))
//           .y((d) => yScale(yValue(d)))
//           .curve(curveNatural)(data)}
//       />
//       {data.map((d) => (
//         <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
//           <title>{tooltipFormat(xValue(d))}</title>
//         </circle>
//       ))}
//     </g>
//   </>
// );

// export const Marks = ({
//   data,
//   xScale,
//   yScale,
//   xValue,
//   yValue,
//   circleRadius,
//   // colorScale,
//   // colorValue
// }) => {
//   return data.map((d) => (
//     <circle
//       className="mark"
//       cx={xScale(xValue(d))}
//       cy={yScale(yValue(d))}
//       // fill={colorScale(colorValue(d))}
//       r={circleRadius}
//     >
//       <title>{xValue(d)}</title>
//     </circle>
//   ));
// };

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
}) =>
  data.map((d) => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ));