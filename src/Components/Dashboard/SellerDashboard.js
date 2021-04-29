import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useInventoryContext } from "../../inventory";
import { authService } from "../../authService";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CustomTable from "./DashboardTable";
import { useStyles } from "./Hooks/useStyles";
import { date, monthNames } from "./Hooks/useMonths";
import { useFinancialHeaders, useFinancialByMonthHeaders, useAvailableHeaders, useSoldHeaders, useSales24HoursHeaders, useSellerInventory } from "./Hooks/useHeaders";

export default function SellerDashboard() {
  const classes = useStyles();

  const tableRef = useRef(null);
  const { inventory, getInventoryBySellerId } = useInventoryContext();
  const { id } = authService.getUser();
  const [sellerInventory, setSellerInventory] = useState([]);
  const [availableInventory, setAvailableInventory] = useState([]);
  const [soldInventory, setSoldInventory] = useState([]);
  const [awaitingShipment, setAwaitingShipment] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [saleWithin24Hrs, setSaleWithin24Hrs] = useState(0);
  const [soldInventoryWithin24Hrs, setSoldInventoryWithin24Hrs] = useState([]);
  const [gridSize, setGridSize] = useState(0);

  // table data
  const [data, setData] = useState([]);
  const [defaultOrderBy, setDefaultOrderBy] = useState("");
  const [title, setTitle] = useState("");
  const [headers, setHeaders] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  // financial (year) table data
  const [financialDataByYear, setFinancialDataByYear] = useState([]);
  const financialDefaultOrderByYear = "year";
  const financialTitleByYear = "Financial Report By Year";
  const [financialHeadersByYear, setFinancialHeadersByYear] = useState([]);

  // financial (month) table data
  const [financialDataByMonth, setFinancialDataByMonth] = useState([]);
  const financialDefaultOrderByMonth = "date";
  const financialTitleByMonth = "Financial Report By Month";
  const [financialHeadersByMonth, setFinancialHeadersByMonth] = useState([]);

  // width to make view responsive
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // clean up code
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // change grid size based on width
  useEffect(() => {
    if (width < 1000) setGridSize(12);
    else if (width < 1600) setGridSize(6);
    else setGridSize(3);
  }, [width]);

  // set the available inventory to sell
  useEffect(() => {
    getInventoryBySellerId(id)
      .then((data) => {
        setSellerInventory(data);
      })
      .catch((error) => {
        console.log("getInventoryBySellerId Error:", error);
      });
  }, []);

  // set the sold inventory
  useEffect(() => {
    setAvailableInventory(sellerInventory.filter((item) => item.sold === null));
    setSoldInventory(sellerInventory.filter((item) => item.sold !== null));
  }, [sellerInventory]);

  useEffect(() => {
    setAwaitingShipment(
      soldInventory.filter((item) => item.shippingStatus === 0).length
    );
    initFiancialDataByYear(soldInventory);
    initFiancialDataByMonth(soldInventory);

    // get inventories sold within 24 hrs
    setSoldInventoryWithin24Hrs(
      soldInventory.filter((item) => {
        const current = new Date();
        const soldDate = new Date(item.sold);
        const oneDay = 60 * 60 * 24 * 1000;
        return current - soldDate <= oneDay;
      })
    );
  }, [soldInventory]);

  useEffect(() => {
    // calculate the total price from inventories sold within 24 hrs
    const profit = soldInventoryWithin24Hrs.map(
      (item) => item.price - item.cost
    );
    setSaleWithin24Hrs(profit.reduce((a, b) => a + b, 0));
  }, [soldInventoryWithin24Hrs]);

  useEffect(() => {
    setSelectedTable(0);
  }, [availableInventory]);

  const initFiancialDataByYear = (data) => {
    setFinancialHeadersByYear(useFinancialHeaders);
    const yearData = {};
    data.forEach((item) => {
      // get the year
      const year = new Date(item.sold).getFullYear();
      // create an object or get the existing ones
      const object = yearData[year] || {};
      const revenue = item.price;
      const fees = item.price * (item.commission / 100);
      const profit = revenue - fees;
      const retail = item.retailPrice;
      // const recovery = (profit/retail) * 100;

      const keys = ["revenue", "fees", "profit", "retail"];
      const tempObject = {
        revenue: revenue,
        fees: fees,
        profit: profit,
        retail: retail,
      };

      // populate the yearData
      keys.forEach((key) => {
        if (key in object) {
          object[key] += tempObject[key];
        } else {
          object[key] = tempObject[key];
        }
      });

      object["recovery"] = (object["profit"] / object["retail"]) * 100;
      if (isNaN(object["recovery"])) object["recovery"] = 0;

      yearData[year] = object;
    });

    setFinancialDataByYear(
      Object.entries(yearData).map(([key, value], index) => {
        return { id: index, year: key, ...value };
      })
    );
  };

  const initFiancialDataByMonth = (data) => {
    setFinancialHeadersByMonth(useFinancialByMonthHeaders);
    const yearData = {};
    data.forEach((item) => {
      // get the year
      const date = new Date(item.sold);
      const month = date.getMonth();
      const year = date.getFullYear();
      const objectKey = `${monthNames[month]} ${year}`;
      // create an object or get the existing ones
      const object = yearData[objectKey] || {};
      const revenue = item.price;
      const fees = item.price * (item.commission / 100);
      const profit = revenue - fees;
      const retail = item.retailPrice;
      // const recovery = (profit/retail) * 100;

      const keys = ["revenue", "fees", "profit", "retail"];
      const tempObject = {
        revenue: revenue,
        fees: fees,
        profit: profit,
        retail: retail,
      };

      // populate the yearData
      keys.forEach((key) => {
        if (key in object) {
          object[key] += tempObject[key];
        } else {
          object[key] = tempObject[key];
        }
      });

      object["recovery"] = (object["profit"] / object["retail"]) * 100;
      if (isNaN(object["recovery"])) object["recovery"] = 0;

      yearData[objectKey] = object;
    });

    // set the current month and year gross profit
    const currentKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    // set the monthly financial data
    setFinancialDataByMonth(
      Object.entries(yearData).map(([key, value], index) => {
        if (key === currentKey) {
          setGrossProfit(value["profit"]);
        }
        return { id: index, date: key, ...value };
      })
    );
  };

  const numberWithCommas = (number, money = false) => {
    if (money) {
      return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const setSelectedTable = (value) => {
    switch (value) {
      case 0:
        // View Available Inventory
        setTitle("Your Available Inventories");
        setData(availableInventory);
        setHeaders(useAvailableHeaders);
        setFilterBy("created");
        setDefaultOrderBy("created");
        break;
      case 1:
        // View Sold Inventory
        setTitle("Your Sold Inventories");
        setData(soldInventory);
        setHeaders(useSoldHeaders);
        setFilterBy("sold");
        setDefaultOrderBy("sold");
        break;
      case 2:
        // View Sold Inventory Within 24 Hrs
        setTitle("Your Sales Within 24 Hrs");
        setData(soldInventoryWithin24Hrs);
        setHeaders(useSales24HoursHeaders);
        setFilterBy("sold");
        setDefaultOrderBy("sold");
        break;
      default:
        // View All Inventory
        setTitle("All Your Inventories");
        setData(sellerInventory);
        setHeaders(useSellerInventory);
        setFilterBy("created");
        setDefaultOrderBy("created");
    }
  };

  const updateTable = (index) => {
    setSelectedTable(index);
    tableRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={gridSize}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography className={classes.title_centered} gutterBottom>
                Your Available Inventories
              </Typography>
              <Typography
                className={classes.body_centered}
                variant="h5"
                component="h2"
              >
                {availableInventory.length}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={() => updateTable(0)}
              >
                View Your Available Inventories
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={gridSize}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography className={classes.title_centered} gutterBottom>
                {monthNames[date.getMonth()]}'s Gross Profit (USD)
              </Typography>
              <Typography
                className={classes.body_centered}
                variant="h5"
                component="h2"
              >
                ${numberWithCommas(grossProfit, true)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={() => updateTable(1)}
              >
                View Sold Inventories
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={gridSize}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography className={classes.title_centered} gutterBottom>
                Gross Profit (USD) Within 24 Hrs
              </Typography>
              <Typography
                className={classes.body_centered}
                variant="h5"
                component="h2"
              >
                ${numberWithCommas(saleWithin24Hrs, true)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={() => updateTable(2)}
              >
                View Sales Within 24 Hrs
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={gridSize}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography className={classes.title_centered} gutterBottom>
                Awaiting Shipment
              </Typography>
              <Typography
                className={classes.body_centered}
                variant="h5"
                component="h2"
              >
                {awaitingShipment}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={() => updateTable(3)}
              >
                View All Your Inventories
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} ref={tableRef}>
          <CustomTable
            data={data}
            defaultOrderBy={defaultOrderBy}
            title={title}
            headers={headers}
            filterBy={filterBy}
            width={width}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTable
            data={financialDataByMonth}
            defaultOrderBy={financialDefaultOrderByMonth}
            title={financialTitleByMonth}
            headers={financialHeadersByMonth}
            showDateFilter={false}
            width={width}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTable
            data={financialDataByYear}
            defaultOrderBy={financialDefaultOrderByYear}
            title={financialTitleByYear}
            headers={financialHeadersByYear}
            showDateFilter={false}
            width={width}
          />
        </Grid>
      </Grid>
    </div>
  );
}
