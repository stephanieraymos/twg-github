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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(5),
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
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date();

    // table data
    const [data, setData] = useState([]);
    const [defaultOrderBy, setDefaultOrderBy] = useState("");
    const [title, setTitle] = useState("");
    const [headers, setHeaders] = useState([]);
    const [filterBy, setFilterBy] = useState("");

    // financial (year) table data
    const [financialDataByYear, setFinancialDataByYear] = useState([]);
    const financialDefaultOrderByYear = 'year';
    const financialTitleByYear = "Financial Report By Year";
    const [financialHeadersByYear, setFinancialHeadersByYear] = useState([]);

    // financial (month) table data
    const [financialDataByMonth, setFinancialDataByMonth] = useState([]);
    const financialDefaultOrderByMonth = 'date';
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
        if (width < 1000)
            setGridSize(12);
        else if (width < 1600)
            setGridSize(6);
        else
            setGridSize(3);
    }, [width])

    // set the available inventory to sell
    useEffect(() => {
        getInventoryBySellerId(id)
            .then((data) => {
                //setSellerInventory(data);
                setSellerInventory([
                    {
                        "id": "d111f153-96ee-4207-9e61-5952af52e9b8",
                        "loadId": "34a86a1a",
                        "source": "Target",
                        "category": "Jewelry",
                        "units": 60,
                        "palletCount": 25,
                        "fob": "Sacramento, CA",
                        "retailPrice": 5000.0,
                        "price": 3500.0,
                        "sellerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "buyerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "manifestIds": [],
                        "created": "2021-04-21T23:21:54.853000Z",
                        "status": 2,
                        "contents": [
                            "clothes",
                            "toys"
                        ],
                        "cost": 1200.0,
                        "commission": 10.0,
                        "owner": "RL Liquidators",
                        "lane": "F6",
                        "sales": "",
                        "accounting": "",
                        "logistics": "",
                        "imageIds": [],
                        "sold": null,
                        "paid": false,
                        "shippingStatus": 0
                    },
                    {
                        "id": "d56b0051-2e67-44e6-9492-9d6d9f6c1f0f",
                        "loadId": "16951fef",
                        "source": "Amazon",
                        "category": "TV",
                        "units": 100,
                        "palletCount": 36,
                        "fob": "Sacramento, CA",
                        "retailPrice": 12345.0,
                        "price": 3500.0,
                        "sellerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "buyerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "manifestIds": [],
                        "created": "2021-04-21T23:21:54.882000Z",
                        "status": 2,
                        "contents": [
                            "clothes",
                            "toys"
                        ],
                        "cost": 3242.0,
                        "commission": 10.0,
                        "owner": "RL Liquidators",
                        "lane": "F6",
                        "sales": "",
                        "accounting": "",
                        "logistics": "",
                        "imageIds": [],
                        "sold": null,
                        "paid": false,
                        "shippingStatus": 0
                    },
                    {
                        "id": "099797cb-347f-4d74-9a56-f0de4dc324e1",
                        "loadId": "50b6e240",
                        "source": "Walmart",
                        "category": "Clothes",
                        "units": 100,
                        "palletCount": 49,
                        "fob": "Sacramento, CA",
                        "retailPrice": 5000.0,
                        "price": 4000.0,
                        "sellerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "buyerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "manifestIds": [],
                        "created": "2021-04-22T22:57:50.835000Z",
                        "status": 0,
                        "contents": [
                            "clothes",
                            "toys"
                        ],
                        "cost": 3242.0,
                        "commission": 10.0,
                        "owner": "RL Liquidators",
                        "lane": "F6",
                        "sales": "",
                        "accounting": "",
                        "logistics": "",
                        "imageIds": [],
                        "sold": "2021-04-27T08:36:07.984000Z",
                        "paid": false,
                        "shippingStatus": 0
                    },
                    {
                        "id": "2de40dd4-316a-4fdf-b15b-3dfbf7958821",
                        "loadId": "89b8a4e8",
                        "source": "Amazon",
                        "category": "Jewelry",
                        "units": 100,
                        "palletCount": 30,
                        "fob": "Sacramento, CA",
                        "retailPrice": 5000.0,
                        "price": 4000.0,
                        "sellerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "buyerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "manifestIds": [],
                        "created": "2021-04-27T08:57:50.887000Z",
                        "status": 0,
                        "contents": [],
                        "cost": 1200.0,
                        "commission": 15.0,
                        "owner": "RL Liquidators",
                        "lane": "F6",
                        "sales": "",
                        "accounting": "",
                        "logistics": "",
                        "imageIds": [],
                        "sold": "2021-04-23T18:52:46.104000Z",
                        "paid": false,
                        "shippingStatus": 0
                    },
                    {
                        "id": "dc1f38cb-6593-460c-a133-873cf1192862",
                        "loadId": "a92a9281",
                        "source": "Test",
                        "category": "Testing",
                        "units": 50000,
                        "palletCount": 100,
                        "fob": "Sac",
                        "retailPrice": 50000.0,
                        "price": 45000.0,
                        "sellerId": "cb519c64-1f51-479f-9e2a-2286f4a45c9a",
                        "buyerId": null,
                        "manifestIds": [],
                        "created": "2021-04-22T22:57:50.887000Z",
                        "status": 2,
                        "contents": [
                            "Stuff"
                        ],
                        "cost": 30000.0,
                        "commission": 20.0,
                        "owner": "Stephanie",
                        "lane": "4K",
                        "sales": "",
                        "accounting": "",
                        "logistics": "",
                        "imageIds": [],
                        "sold": "2020-04-22T16:50:38.690000Z",
                        "paid": false,
                        "shippingStatus": 0
                    },
                    {
                        "id": "5cfcef02-07e6-4632-97f0-45a7a4bb02d5",
                        "loadId": "707f062b",
                        "source": "Walmart",
                        "category": "Clothes",
                        "units": 100,
                        "palletCount": 30,
                        "fob": "Sacramento, CA",
                        "retailPrice": 12345.0,
                        "price": 4000.0,
                        "sellerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "buyerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "manifestIds": [],
                        "created": "2021-04-21T23:21:54.865000Z",
                        "status": 2,
                        "contents": [
                            "clothes",
                            "toys"
                        ],
                        "cost": 3242.0,
                        "commission": 10.0,
                        "owner": "RL Liquidators",
                        "lane": "F6",
                        "sales": "",
                        "accounting": "",
                        "logistics": "",
                        "imageIds": [],
                        "sold": "2021-02-22T16:50:38.690000Z",
                        "paid": true,
                        "shippingStatus": 1
                    },
                    {
                        "id": "d47481d3-6d10-4c9e-b8de-ecf5cc11a14f",
                        "loadId": "482cfab1",
                        "source": "Target",
                        "category": "Clothes",
                        "units": 50,
                        "palletCount": 30,
                        "fob": "Sacramento, CA",
                        "retailPrice": 12345.0,
                        "price": 3500.0,
                        "sellerId": "d8035613-cd92-41c2-a48f-3762262b3a1b",
                        "buyerId": null,
                        "manifestIds": [],
                        "created": "2021-04-22T22:57:50.802000Z",
                        "status": 2,
                        "contents": [
                            "clothes",
                            "toys"
                        ],
                        "cost": 9872.0,
                        "commission": 10.0,
                        "owner": "RL Liquidators",
                        "lane": "F6",
                        "sales": "",
                        "accounting": "",
                        "logistics": "",
                        "imageIds": [],
                        "sold": "2021-03-22T16:50:38.690000Z",
                        "paid": false,
                        "shippingStatus": 0
                    },
                    {
                        "id": "ddab31a5-e85a-43cd-a53f-9e87fb4230d4",
                        "loadId": "cfedb04e",
                        "source": "test",
                        "category": "jkl",
                        "units": 0,
                        "palletCount": 0,
                        "fob": "jkl",
                        "retailPrice": 0.0,
                        "price": 0.0,
                        "sellerId": "cb519c64-1f51-479f-9e2a-2286f4a45c9a",
                        "buyerId": null,
                        "manifestIds": [],
                        "created": "2021-04-21T22:29:05.273000Z",
                        "status": 0,
                        "contents": [
                            "jkl"
                        ],
                        "cost": 0.0,
                        "commission": 0.0,
                        "owner": "jkl",
                        "lane": "jkl",
                        "sales": "Sales notes update test",
                        "accounting": "Accounting notes update test",
                        "logistics": "Logistics notes test",
                        "imageIds": [],
                        "sold": "2021-04-27T16:50:38.690000Z",
                        "paid": false,
                        "shippingStatus": 0
                    }
                ]);
            })
            .catch((error) => {
                console.log("getInventoryBySellerId Error:", error)
            })
    }, []);

    // set the sold inventory
    useEffect(() => {
        setAvailableInventory(sellerInventory.filter(item => item.sold === null))
        setSoldInventory(sellerInventory.filter(item => item.sold !== null))
    }, [sellerInventory]);

    useEffect(() => {
        setAwaitingShipment(soldInventory.filter(item => item.shippingStatus === 0).length)
        initFiancialDataByYear(soldInventory);
        initFiancialDataByMonth(soldInventory);

        // get inventories sold within 24 hrs
        setSoldInventoryWithin24Hrs(soldInventory.filter(item => {
            const current = new Date();
            const soldDate = new Date(item.sold);
            const oneDay = 60 * 60 * 24 * 1000;
            return (current - soldDate) <= oneDay;
        }));
    }, [soldInventory])

    useEffect(() => {
        // calculate the total price from inventories sold within 24 hrs
        const profit = soldInventoryWithin24Hrs.map(item => {
            const revenue = item.price;
            const fees = item.price * (item.commission / 100);
            return revenue - fees;
        })
        setSaleWithin24Hrs(profit.reduce((a, b) => a + b, 0));
    }, [soldInventoryWithin24Hrs])

    useEffect(() => {
        setSelectedTable(0);
    }, [availableInventory]);

    const initFiancialDataByYear = (data) => {
        setFinancialHeadersByYear([
            { id: 'year', numeric: false, label: 'Year', type: 'normal' },
            { id: 'revenue', numeric: true, label: 'Revenue (USD)', type: 'money' },
            { id: 'fees', numeric: true, label: 'Commissions Paid (USD)', type: 'money' },
            { id: 'profit', numeric: true, label: 'Gross Profit (USD)', type: 'money' },
            { id: 'retail', numeric: true, label: 'Retail Values (USD)', type: 'money' },
            { id: 'recovery', numeric: true, label: 'Recovery Rate (%)', type: 'percent' },
        ]);
        const yearData = {};
        data.forEach(item => {
            // get the year
            const year = new Date(item.sold).getFullYear();
            // create an object or get the existing ones
            const object = yearData[year] || {};
            const revenue = item.price;
            const fees = item.price * (item.commission / 100);
            const profit = revenue - fees;
            const retail = item.retailPrice;
            // const recovery = (profit/retail) * 100;

            const keys = ['revenue', 'fees', 'profit', 'retail'];
            const tempObject = {
                'revenue': revenue,
                'fees': fees,
                'profit': profit,
                'retail': retail,
            }

            // populate the yearData
            keys.forEach(key => {
                if (key in object) {
                    object[key] += tempObject[key];
                } else {
                    object[key] = tempObject[key];
                }
            });

            object['recovery'] = (object['profit'] / object['retail']) * 100;
            if (isNaN(object['recovery']))
                object['recovery'] = 0;
            
            yearData[year] = object
        });
        
        setFinancialDataByYear(Object.entries(yearData).map(([key, value], index) => {
            return {id: index, year: key, ...value}
        }));
    }

    const initFiancialDataByMonth = (data) => {
        setFinancialHeadersByMonth([
            { id: 'date', numeric: false, label: 'Month', type: 'normal' },
            { id: 'revenue', numeric: true, label: 'Revenue (USD)', type: 'money' },
            { id: 'fees', numeric: true, label: 'Commissions Paid (USD)', type: 'money' },
            { id: 'profit', numeric: true, label: 'Gross Profit (USD)', type: 'money' },
            { id: 'retail', numeric: true, label: 'Retail Values (USD)', type: 'money' },
            { id: 'recovery', numeric: true, label: 'Recovery Rate (%)', type: 'percent' },
        ]);
        const yearData = {};
        data.forEach(item => {
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

            const keys = ['revenue', 'fees', 'profit', 'retail'];
            const tempObject = {
                'revenue': revenue,
                'fees': fees,
                'profit': profit,
                'retail': retail,
            }

            // populate the yearData
            keys.forEach(key => {
                if (key in object) {
                    object[key] += tempObject[key];
                } else {
                    object[key] = tempObject[key];
                }
            });

            object['recovery'] = (object['profit'] / object['retail']) * 100;
            if (isNaN(object['recovery']))
                object['recovery'] = 0;
            
            yearData[objectKey] = object
        });

        // set the current month and year gross profit
        const currentKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
        
        // set the monthly financial data
        setFinancialDataByMonth(Object.entries(yearData).map(([key, value], index) => {
            if (key === currentKey) {
                setGrossProfit(value['profit'])
            }
            return {id: index, date: key, ...value}
        }));
    }

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
                setTitle("Your Available Inventories");
                setData(availableInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID', type: 'normal' },
                    { id: 'created', numeric: false, label: 'Created', type: 'date' },
                    { id: 'source', numeric: false, label: 'Program', type: 'normal' },
                    { id: 'category', numeric: false, label: 'Category', type: 'normal' },
                    { id: 'units', numeric: true, label: 'Units', type: 'normal' },
                    { id: 'palletCount', numeric: true, label: 'Pallets', type: 'normal' },
                    { id: 'fob', numeric: false, label: 'FOB', type: 'normal' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)', type: 'money' },
                    { id: 'price', numeric: true, label: 'Price (USD)', type: 'money' },
                ]);
                setFilterBy('created');
                setDefaultOrderBy('created');
                break;
            case 1:
                // View Sold Inventory
                setTitle("Your Sold Inventories");
                setData(soldInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID', type: 'normal' },
                    { id: 'sold', numeric: false, label: 'Sold', type: 'date' },
                    { id: 'source', numeric: false, label: 'Program', type: 'normal' },
                    { id: 'category', numeric: false, label: 'Category', type: 'normal' },
                    { id: 'units', numeric: true, label: 'Units', type: 'normal' },
                    { id: 'palletCount', numeric: true, label: 'Pallets', type: 'normal' },
                    { id: 'fob', numeric: false, label: 'FOB', type: 'normal' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)', type: 'money' },
                    { id: 'price', numeric: true, label: 'Price (USD)', type: 'money' },
                    { id: 'paid', numeric: true, label: 'Payment Status', type: 'normal' },
                ]);
                setFilterBy('sold');
                setDefaultOrderBy('sold');
                break;
            case 2:
                // View Sold Inventory Within 24 Hrs
                setTitle("Your Sales Within 24 Hrs");
                setData(soldInventoryWithin24Hrs);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID', type: 'normal' },
                    { id: 'sold', numeric: false, label: 'Sold', type: 'date' },
                    { id: 'source', numeric: false, label: 'Program', type: 'normal' },
                    { id: 'category', numeric: false, label: 'Category', type: 'normal' },
                    { id: 'units', numeric: true, label: 'Units', type: 'normal' },
                    { id: 'palletCount', numeric: true, label: 'Pallets', type: 'normal' },
                    { id: 'fob', numeric: false, label: 'FOB', type: 'normal' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)', type: 'money' },
                    { id: 'price', numeric: true, label: 'Price (USD)', type: 'money' },
                    { id: 'paid', numeric: true, label: 'Payment Status', type: 'normal' },
                ]);
                setFilterBy('sold');
                setDefaultOrderBy('sold');
                break;
            default:
                // View All Inventory
                setTitle("All Your Inventories");
                setData(sellerInventory);
                setHeaders([
                    { id: 'loadId', numeric: false, label: 'Load ID', type: 'normal' },
                    { id: 'created', numeric: false, label: 'Created', type: 'date' },
                    { id: 'source', numeric: false, label: 'Program', type: 'normal' },
                    { id: 'category', numeric: false, label: 'Category', type: 'normal' },
                    { id: 'units', numeric: true, label: 'Units', type: 'normal' },
                    { id: 'palletCount', numeric: true, label: 'Pallets', type: 'normal' },
                    { id: 'fob', numeric: false, label: 'FOB', type: 'normal' },
                    { id: 'retailPrice', numeric: true, label: 'Retail (USD)', type: 'money' },
                    { id: 'price', numeric: true, label: 'Price (USD)', type: 'money' },
                    { id: 'shippingStatus', numeric: true, label: 'Shipping Status', type: 'normal' },
                ]);
                setFilterBy('created');
                setDefaultOrderBy('created');
        }
    }

    const updateTable = (index) => {
        setSelectedTable(index);
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={gridSize}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title_centered} gutterBottom>
                                Your Available Inventories
                            </Typography>
                            <Typography className={classes.body_centered} variant="h5" component="h2">
                                {availableInventory.length}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary"
                                onClick={() => updateTable(0)}>View Your Available Inventories</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={gridSize}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title_centered} gutterBottom>
                                {monthNames[date.getMonth()]}'s Gross Profit (USD)
                            </Typography>
                            <Typography className={classes.body_centered} variant="h5" component="h2">
                                ${numberWithCommas(grossProfit, true)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary"
                                onClick={() => updateTable(1)}>View Sold Inventories</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={gridSize}>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title_centered} gutterBottom>
                                Total Revenue (USD) Within 24 Hrs
                            </Typography>
                            <Typography className={classes.body_centered} variant="h5" component="h2">
                                ${numberWithCommas(saleWithin24Hrs, true)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} variant="outlined" color="primary"
                                onClick={() => updateTable(2)}>View Sales Within 24 Hrs</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={gridSize}>
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
                                onClick={() => updateTable(3)}>View All Your Inventories</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} ref={tableRef}>
                    <CustomTable data={data}
                        defaultOrderBy={defaultOrderBy}
                        title={title}
                        headers={headers}
                        filterBy={filterBy}
                        width={width} />
                </Grid>
                <Grid item xs={12}>
                    <CustomTable data={financialDataByMonth}
                        defaultOrderBy={financialDefaultOrderByMonth}
                        title={financialTitleByMonth}
                        headers={financialHeadersByMonth}
                        showDateFilter={false}
                        width={width} />
                </Grid>
                <Grid item xs={12}>
                    <CustomTable data={financialDataByYear}
                        defaultOrderBy={financialDefaultOrderByYear}
                        title={financialTitleByYear}
                        headers={financialHeadersByYear}
                        showDateFilter={false}
                        width={width} />
                </Grid>
            </Grid>
        </div>
    );
};