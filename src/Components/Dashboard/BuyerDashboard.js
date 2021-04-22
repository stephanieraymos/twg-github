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
import { inventoryPATH } from "../../Pages/paths";

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

    const { inventory, getInventoryByBuyerId } = useInventoryContext();
    const { id } = authService.getUser();
    const [availableInventory, setAvailableInventory] = useState([]);
    const [purchasedInventory, setPurchasedInventory] = useState([]);
    const [unpaidInventory, setUnpaidInventory] = useState([]);
    const [amountDue, setAmountDue] = useState(0.0);
    const [avgCostPerItem, setAvgCostPerItem] = useState(0.0);
    const [purchaseByCategory, setPurchaseByCategory] = useState({});
    const [awaitingShipment, setAwaitingShipment] = useState(0);

    // boolean
    const [selectViewAvailableInventory, setSelectViewAvailableInventory] = useState(true);
    const [selectViewUnpaidInventory, setSelectViewUnpaidInventory] = useState(false);
    const [selectViewPurchasedInventory, setSelectViewPurchasedInventory] = useState(false);

    // table data
    const [data, setData] = useState([]);
    const defaultOrderBy = 'source';
    const [title, setTitle] = useState("");
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        getInventoryByBuyerId(id)
            .then((data) => {
                setPurchasedInventory(data);
            })
            .catch((error) => {
                console.log("getInventoryByBuyerId Error:", error)
            })
    }, [])

    useEffect(() => {
        setAvailableInventory(inventory.filter(item => item.status === 2));
    }, [inventory])

    useEffect(() => {
        setSelectedTable(0);
    }, [availableInventory])

    useEffect(() => {
        setUnpaidInventory(purchasedInventory.filter(item => !item.paid));
        // Calculate avg cost per item
        const units = purchasedInventory.map(item => item.units)
        const totalUnits = units.reduce((a, b) => a + b, 0);
        const prices = purchasedInventory.map(item => item.price)
        const totalPrices = prices.reduce((a, b) => a + b, 0);
        setAvgCostPerItem((totalPrices / totalUnits).toFixed(2));
        // Calculate number of trucks awaiting shipment
        setAwaitingShipment(purchasedInventory.filter(item => item.shippingStatus === 0).length)
    }, [purchasedInventory])

    useEffect(() => {
        // Calculate the unpaid amount
        const unpaidAmount = unpaidInventory.map(item => item.price)
        const totalUnpaidAmount = unpaidAmount.reduce((a, b) => a + b, 0);
        setAmountDue(totalUnpaidAmount);
    }, [unpaidInventory])

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const setSelectedTable = (value) => {
        switch (value) {
            case 0:
                // View Available Inventory
                setSelectViewAvailableInventory(true);
                setSelectViewUnpaidInventory(false);
                setSelectViewPurchasedInventory(false);
                setTitle("Available Inventories");
                setData(availableInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID' },
                    { id: 'source', numeric: false, label: 'Program' },
                    { id: 'category', numeric: false, label: 'Category' },
                    { id: 'units', numeric: true, label: 'Units' },
                    { id: 'palletCount', numeric: true, label: 'Pallets' },
                    { id: 'fob', numeric: false, label: 'DOB' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)' },
                    { id: 'price', numeric: true, label: 'Price (USD)' },
                ]);
                break;
            case 1:
                // View Unpaid Inventory
                setSelectViewAvailableInventory(false);
                setSelectViewUnpaidInventory(true);
                setSelectViewPurchasedInventory(false);
                setTitle("Unpaid Inventories");
                setData(unpaidInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID' },
                    { id: 'source', numeric: false, label: 'Program' },
                    { id: 'category', numeric: false, label: 'Category' },
                    { id: 'units', numeric: true, label: 'Units' },
                    { id: 'palletCount', numeric: true, label: 'Pallets' },
                    { id: 'fob', numeric: false, label: 'DOB' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)' },
                    { id: 'price', numeric: true, label: 'Price (USD)' },
                ]);
                break;
            default:
                // View Purchased Inventory
                setSelectViewAvailableInventory(false);
                setSelectViewUnpaidInventory(false);
                setSelectViewPurchasedInventory(true);
                setTitle("Purchased Inventories");
                setData(purchasedInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID' },
                    { id: 'source', numeric: false, label: 'Program' },
                    { id: 'category', numeric: false, label: 'Category' },
                    { id: 'units', numeric: true, label: 'Units' },
                    { id: 'palletCount', numeric: true, label: 'Pallets' },
                    { id: 'fob', numeric: false, label: 'DOB' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)' },
                    { id: 'price', numeric: true, label: 'Price (USD)' },
                    { id: 'shippingStatus', numeric: true, label: 'Shipping Status' },
                ]);
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
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
                                onClick={() => setSelectedTable(0)}>View Available Inventories</Button>
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
                                ${numberWithCommas(amountDue)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary"
                                onClick={() => setSelectedTable(1)}>View Unpaid Orders</Button>
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
                                onClick={() => setSelectedTable(2)}>View Purchased Inventories</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable data={data}
                        defaultOrderBy={defaultOrderBy}
                        title={title}
                        headers={headers} />
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title_centered} gutterBottom>
                                Average Cost Per Item
                            </Typography>
                            <Typography className={classes.body_centered} variant="h5" component="h2">
                                ${numberWithCommas(avgCostPerItem)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};