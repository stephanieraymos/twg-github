import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useInventoryContext } from "../../inventory";
import { authService } from "../../authService";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CustomTable from "./DashboardTable";
import Barplot from "./DashboardBarplot";
import { inventoryPATH } from "../../Pages/paths";
import * as d3 from "d3";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5),
        backgroundColor: '#f7f8fc',
    },
    card: {
        borderRadius: 15,
    },
    title: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        color: theme.palette.text.secondary,
    },
    body: {
        fontFamily: 'Montserrat, sans-serif',
        color: theme.palette.text.primary,
    },
    title_centered: {
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'center',
        fontWeight: 700,
        color: theme.palette.text.secondary,
    },
    body_centered: {
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    button: {
        fontFamily: 'Montserrat, sans-serif',
        margin: 'auto',
    },
}));

export default function BuyerDashboard() {
    const classes = useStyles();

    const tableRef = useRef(null);
    const { inventory, getInventoryByBuyerId } = useInventoryContext();
    const { id } = authService.getUser();
    const [availableInventory, setAvailableInventory] = useState([]);
    const [purchasedInventory, setPurchasedInventory] = useState([]);
    const [unpaidInventory, setUnpaidInventory] = useState([]);
    const [amountDue, setAmountDue] = useState(0.0);
    const [avgCostPerItem, setAvgCostPerItem] = useState(0.0);
    const [purchaseByCategory, setPurchaseByCategory] = useState([
        {
            name: "A",
            value: 1
        },
        {
            name: "B",
            value: 2
        },
        {
            name: "C",
            value: 3
        },
        {
            name: "D",
            value: 4
        },
        {
            name: "E",
            value: 5
        },
        {
            name: "F",
            value: 6
        },
        {
            name: "G",
            value: 7
        },
        {
            name: "H",
            value: 8
        },
        {
            name: "I",
            value: 9
        },
        {
            name: "J",
            value: 10
        },
    ]);
    const [awaitingShipment, setAwaitingShipment] = useState(0);

    // table data
    const [data, setData] = useState([]);
    const defaultOrderBy = 'source';
    const [title, setTitle] = useState("");
    const [headers, setHeaders] = useState([]);
    const [filterBy, setFilterBy] = useState("");

    // table width
    const barplotRef = useRef(null);
    const [barplotWidth, setBarplotWidth] = useState(0);
    useEffect(() => {
        if (barplotRef.current)
            setBarplotWidth(barplotRef.current.offsetWidth);
      }, [barplotRef]);

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        // clean up code
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    useEffect(() => {
        getInventoryByBuyerId(id)
            .then((data) => {
                setPurchasedInventory(data);
            })
            .catch((error) => {
                console.log("getInventoryByBuyerId Error:", error)
            })
    }, []);

    useEffect(() => {
        setAvailableInventory(inventory.filter(item => item.status === 2));
    }, [inventory]);

    useEffect(() => {
        setSelectedTable(0);
    }, [availableInventory]);

    useEffect(() => {
        // get the unpaid inventory list
        setUnpaidInventory(purchasedInventory.filter(item => !item.paid));

        // Calculate avg cost per item
        const units = purchasedInventory.map(item => item.units)
        const totalUnits = units.reduce((a, b) => a + b, 0);
        const prices = purchasedInventory.map(item => item.price)
        const totalPrices = prices.reduce((a, b) => a + b, 0);
        setAvgCostPerItem(totalUnits > 0 ? (totalPrices / totalUnits) : 0);

        // Calculate number of trucks awaiting shipment
        setAwaitingShipment(purchasedInventory.filter(item => item.shippingStatus === 0).length)

        const categories = {};
        purchasedInventory.map(value => {
            const category = value.category;
            if (category in categories) {
                categories[category] += 1;
            } else {
                categories[category] = 1;
            }
        });
        setPurchaseByCategory(Object.entries(categories).map(([key, value]) => {
            return { name: key, value: value };
        }));
    }, [purchasedInventory]);

    useEffect(() => {
        // Calculate the unpaid amount
        const unpaidAmount = unpaidInventory.map(item => item.price)
        const totalUnpaidAmount = unpaidAmount.reduce((a, b) => a + b, 0);
        setAmountDue(totalUnpaidAmount);
    }, [unpaidInventory]);

    const numberWithCommas = (number, money=false) => {
        if (money) {
            return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const setSelectedTable = (value) => {
        switch (value) {
            case 0:
                // View Available Inventory
                setTitle("Available Inventories");
                setData(availableInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID', type: 'normal' },
                    { id: 'created', numeric: false, label: 'Created', type: 'date' },
                    { id: 'source', numeric: false, label: 'Program', type: 'normal' },
                    { id: 'category', numeric: false, label: 'Category', type: 'normal' },
                    { id: 'units', numeric: true, label: 'Units', type: 'normal' },
                    { id: 'palletCount', numeric: true, label: 'Pallets', type: 'normal' },
                    { id: 'fob', numeric: false, label: 'DOB', type: 'normal' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)', type: 'money' },
                    { id: 'price', numeric: true, label: 'Price (USD)', type: 'money' },
                ]);
                setFilterBy('created');
                break;
            case 1:
                // View Unpaid Inventory
                setTitle("Unpaid Inventories");
                setData(unpaidInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID', type: 'normal' },
                    { id: 'sold', numeric: false, label: 'Purchased', type: 'date' },
                    { id: 'source', numeric: false, label: 'Program', type: 'normal' },
                    { id: 'category', numeric: false, label: 'Category', type: 'normal' },
                    { id: 'units', numeric: true, label: 'Units', type: 'normal' },
                    { id: 'palletCount', numeric: true, label: 'Pallets', type: 'normal' },
                    { id: 'fob', numeric: false, label: 'DOB', type: 'normal' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)', type: 'money' },
                    { id: 'price', numeric: true, label: 'Price (USD)', type: 'money' },
                ]);
                setFilterBy('sold');
                break;
            default:
                // View Purchased Inventory
                setTitle("Purchased Inventories");
                setData(purchasedInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID', type: 'normal' },
                    { id: 'sold', numeric: false, label: 'Purchased', type: 'date' },
                    { id: 'source', numeric: false, label: 'Program', type: 'normal' },
                    { id: 'category', numeric: false, label: 'Category', type: 'normal' },
                    { id: 'units', numeric: true, label: 'Units', type: 'normal' },
                    { id: 'palletCount', numeric: true, label: 'Pallets', type: 'normal' },
                    { id: 'fob', numeric: false, label: 'DOB', type: 'normal' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)', type: 'money' },
                    { id: 'price', numeric: true, label: 'Price (USD)', type: 'money' },
                    { id: 'shippingStatus', numeric: true, label: 'Shipping Status', type: 'normal' },
                ]);
                setFilterBy('sold');
        }
    }

    const updateTable = (index) => {
        setSelectedTable(index);
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {width < 1000 ? (
                    <>
                        <Grid item xs={12}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Available Inventories
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        {availableInventory.length}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(0)}>View Available Inventories</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Amount Due
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        ${numberWithCommas(amountDue, true)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(1)}>View Unpaid Orders</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Awaiting Shipment
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        {awaitingShipment}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(2)}>View Purchased Inventories</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>
                ) : width < 1250 ? (
                    <>
                        <Grid item xs={6}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Available Inventories
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        {availableInventory.length}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(0)}>View Available Inventories</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Amount Due
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        ${numberWithCommas(amountDue, true)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(1)}>View Unpaid Orders</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Awaiting Shipment
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        {awaitingShipment}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(2)}>View Purchased Inventories</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={4}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Available Inventories
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        {availableInventory.length}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(0)}>View Available Inventories</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Amount Due
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        ${numberWithCommas(amountDue, true)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(1)}>View Unpaid Orders</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Awaiting Shipment
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        {awaitingShipment}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button className={classes.button} variant="outlined" color="primary"
                                        onClick={() => updateTable(2)}>View Purchased Inventories</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </>
                )}
                <Grid item xs={12} ref={tableRef}>
                    <CustomTable 
                        data={data}
                        defaultOrderBy={defaultOrderBy}
                        title={title}
                        headers={headers}
                        filterBy={filterBy}
                        width={width} />
                </Grid>
                {width < 1250 ? (
                    <>
                        <Grid item xs={12}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Average Cost Per Item
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        ${numberWithCommas(avgCostPerItem, true)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {purchaseByCategory.length > 0 &&
                            <Grid item xs={12}>
                                <Card className={classes.card} variant="outlined">
                                    <CardContent ref={barplotRef}>
                                        <Typography className={classes.title_centered} gutterBottom>
                                            Purchase By Category (Top 10)
                                        </Typography>
                                        {barplotWidth > 0 &&
                                            <Barplot
                                                data={purchaseByCategory}
                                                width={barplotWidth * 0.85}
                                                height={500}
                                            />
                                        }

                                    </CardContent>
                                </Card>
                            </Grid>
                        }
                    </>
                ) : (
                    <>
                        {purchaseByCategory.length > 0 &&
                            <Grid item xs={8}>
                                <Card className={classes.card} variant="outlined">
                                    <CardContent ref={barplotRef}>
                                        <Typography className={classes.title_centered} gutterBottom>
                                            Purchase By Category (Top 10)
                                        </Typography>
                                        {barplotWidth > 0 &&
                                            <Barplot
                                                data={purchaseByCategory}
                                                width={barplotWidth * 0.85}
                                                height={500}
                                            />
                                        }

                                    </CardContent>
                                </Card>
                            </Grid>
                        }
                        <Grid item xs={4}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title_centered} gutterBottom>
                                        Average Cost Per Item
                                    </Typography>
                                    <Typography className={classes.body_centered} variant="h5" component="h2">
                                        ${numberWithCommas(avgCostPerItem, true)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}
                
            </Grid>
        </div>
    );
};