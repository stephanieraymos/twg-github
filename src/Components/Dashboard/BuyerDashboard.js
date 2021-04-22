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
import { inventoryPATH } from "../../Pages/paths";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5),
        backgroundColor: '#f7f8fc',
    },
    card: {
        borderRadius: 10,
    },
    title: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    body: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    button: {
        fontFamily: 'Montserrat',
        margin: 'auto',
    }
}));

export default function BuyerDashboard() {
    const classes = useStyles();

    const { inventory, getInventoryByBuyerId } = useInventoryContext();
    const { id } = authService.getUser();
    const [availableInventory, setAvailableInventory] = useState([]);
    const [purchasedInventory, setPurchasedInventory] = useState([]);
    const [amountDue, setAmountDue] = useState(0.0);
    const [avgCostPerItem, setAvgCostPerItem] = useState(0.0);
    const [purchaseByCategory, setPurchaseByCategory] = useState({});

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
        // Calculate the unpaid amount
        const unpaidInventory = purchasedInventory.filter(item => !item.paid)
        const unpaidAmount = unpaidInventory.map(item => item.price)
        const totalUnpaidAmount = unpaidAmount.reduce((a, b) => a + b, 0);
        setAmountDue(totalUnpaidAmount);
        // Calculate avg cost per item
        const units = purchasedInventory.map(item => item.units)
        const totalUnits = units.reduce((a, b) => a + b, 0);
        const prices = purchasedInventory.map(item => item.price)
        const totalPrices = prices.reduce((a, b) => a + b, 0);
        setAvgCostPerItem((totalPrices / totalUnits).toFixed(2));
    }, [purchasedInventory])

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Available Inventories
                            </Typography>
                            <Typography className={classes.body} variant="h5" component="h2">
                                {availableInventory.length}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary">View Available Inventories</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Amount Due
                            </Typography>
                            <Typography className={classes.body} variant="h5" component="h2">
                                ${numberWithCommas(amountDue)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary">View Unpaid Orders</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Average Cost Per Item
                            </Typography>
                            <Typography className={classes.body} variant="h5" component="h2">
                                ${numberWithCommas(avgCostPerItem)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary">View Available Trucks</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Average Cost Per Item
                            </Typography>
                            <Typography className={classes.body} variant="h5" component="h2">
                                20
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary">View Available Trucks</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};