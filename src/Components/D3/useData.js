import { useState, useEffect } from "react";
import { url } from "../../Pages/urls";
import { json } from "d3";

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) {
      console.log(data[0]);
    }
    const row = (d) => {
      d.cost = +d.cost;
      // d.sold = new Date(d.sold);
      d.price = +d.price;
      d.retail_price = +d.retail_price;
      d.program = "d.program";
      d.created = new Date(d.created);
      // d.created = +d.created

      return d;
    };
    json(url, row).then(setData);
  }, []);
  if (data) {
    console.log(data[0]);
  }
  return data;
};
