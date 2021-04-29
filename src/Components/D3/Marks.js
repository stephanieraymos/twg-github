// export const Marks = ({
//   data,
//   xScale,
//   yScale,
//   xValue,
//   yValue,
//   tooltipFormat,
//   binnedData,
// }) =>
//   binnedData.map((d) => (
//     <rect
//       className="mark"
//       x={xScale(xValue(d))}
//       y={yScale(yValue(d))}
//     >
//       <title>{tooltipFormat(xValue(d))}</title>
//     </rect>
//   ));

export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
  mindate,
  maxdate,
}) =>
  binnedData.map((d) => (
    <rect
      // Rectangles must have width and height
      className="mark"
      x={xScale(xScale(d))} //Start date
      y={yScale(yScale(d))}
      width={xScale(maxdate) - xScale(mindate)} //Distance between x0 and x1 after being passed through the xScale
      // height={innerHeight - yScale(d.y)}
      height={40}
      key={yScale}
    >
      {/* Tooltip is sum (d.y) */}
      <title>{tooltipFormat(d.y)}</title>
    </rect>
  ));
