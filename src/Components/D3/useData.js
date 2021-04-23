import { useState, useEffect } from "react";
import { url } from "../../Pages/urls";
import { json } from "d3";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.cost = +d.cost;
      d.sold = new Date(d.sold);
      return d;
    };
    json(url, row).then(setData);
  }, []);

  return data;
};
