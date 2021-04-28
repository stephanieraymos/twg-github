import React, { useEffect, useRef, useState } from "react";
import { useInventoryContext } from "../../inventory";
import { authService } from "../../authService";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CustomTable from "./DashboardTable";
import Chart from "../D3/Chart";
import DashboardBarplot from "./DashboardBarplot";
import dashboard from "../../css/dashboard.css"
import { useStyles } from "./useStyles";
// import { useSellerInventory } from "./useSellerInventory";
import {
  useAvailableHeaders,
  useSoldHeaders,
  useSales24HoursHeaders,
  useAllInventoryHeaders,
} from "./useHeaders";

export default function AdminDashboard() {
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
  const monthNames = [
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
  const date = new Date();

  // table data
  const [data, setData] = useState([]);
  const [defaultOrderBy, setDefaultOrderBy] = useState("");
  const [title, setTitle] = useState("");
  const [headers, setHeaders] = useState([]);
  const [filterBy, setFilterBy] = useState("");

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
        // setSellerInventory(useSellerInventory);
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

    // set gross profit for the current month
    const profit = soldInventory.map((item) => {
      const soldDate = new Date(item.sold);
      const month = soldDate.getMonth();
      const year = soldDate.getFullYear();
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();
      if (month == currentMonth && year == currentYear) {
        return item.price - item.cost;
      }
      return 0;
    });
    setGrossProfit(profit.reduce((a, b) => a + b, 0));

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
        setHeaders(useAllInventoryHeaders);
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
          {/* //* ---- GRAPH ---- */}
          <Card className="chart-card">
            <Chart />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
