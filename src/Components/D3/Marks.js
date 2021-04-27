export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  binnedData,
}) =>
  binnedData.map((d) => (
    <rect
      className="mark"
      x={xScale(xValue(d))}
      y={yScale(yValue(d))}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  ));