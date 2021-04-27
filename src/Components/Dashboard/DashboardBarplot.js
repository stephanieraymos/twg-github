import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function PieChart(props) {

    const margin = {top: 30, right: 30, bottom: 70, left: 50};
    const { data, width, height } = props;

    const ref = useRef(null);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {

        const svg = d3.select(ref.current)

        const x = d3.scaleBand()
                    .range([ 0, width ])
                    .padding(0.2);

        const y = d3.scaleLinear()
                    .range([ height, 0]);

        const xAxis = svg.append("g")
                        .attr("class", "barplot-x-axis")
                        .attr("transform", `translate(0, ${height})`);
        const yAxis = svg.append("g")
                        .attr("class", "barplot-y-axis");

        // Update the X axis
        x.domain(data.map(d => d.name))
        xAxis.call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("font-family", "Montserrat")
            .style("font-size", "14px");

        // Update the Y axis
        y.domain([0, d3.max(data, d => d.value )]);
        yAxis.call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-family", "Montserrat")
            .style("font-size", "14px");

        // Bars
        let bars = svg.selectAll('.bar')
            .data(data)

        let b = bars
            .enter()
            .append("g")
            .merge(bars);

        b.append('rect')
            .attr('class', 'bar')
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", (d, i) => colors(i));

        b.append("text")
            .text(d => d.value)
            .attr("x", d => x(d.name) + x.bandwidth()/2)
            .attr("y", d => y(d.value) - 5)
            .attr("font-family" , "Montserrat")
            .attr("font-size" , "14px")
            .attr("fill" , "black")
            .attr("text-anchor", "middle");

    }, [data]);

    return (
        <svg 
            viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`}
        >
            <g
                ref={ref}
                transform={`translate(${margin.left}, ${margin.top})`}
            />
        </svg>
    );
}