import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { FilterDrama } from "@material-ui/icons";
import { filter } from "d3-array";

const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const keyValuePair = array.map((item, index) => [item, index]);
    keyValuePair.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        // sort by value if one comes before the other
        if (order !== 0) return order;
        // sort by index if the value is the same
        return a[1] - b[1];
    });
    // return only the items
    return keyValuePair.map((item) => item[0]);
}

const CustomTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort, headers } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headers.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            className={classes.title}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

CustomTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    headers: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },
}));

const TableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { data, title, isFiltered, setIsFiltered, setStartDateTime, setEndDateTime, filterBy } = props;

    return (
        <Toolbar className={classes.root} >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {title}
            </Typography>

            <TextField
                id="start-datetime"
                label={`Start ${capitalizeFirstLetter(filterBy)} Date & Time`}
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                onChange={(e) => setStartDateTime(e.target.value)}
            />
            <TextField
                id="end-datetime"
                label={`End ${capitalizeFirstLetter(filterBy)} Date & Time`}
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                onChange={(e) => setEndDateTime(e.target.value)}
            />

            {isFiltered ? (
                <Tooltip title="Delete" title="Remove Filter">
                    <IconButton aria-label="delete" onClick={() => setIsFiltered(false)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list" onClick={() => setIsFiltered(true)}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        borderRadius: 15,
    },
    title: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
    },
    body: {
        fontFamily: 'Montserrat, sans-serif',
    },
}));

export default function CustomTable(props) {
    const { data, defaultOrderBy, title, headers, filterBy } = props;
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(defaultOrderBy);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filteredData, setFilteredData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    const handleRequestSort = (event, property) => {
        // swich order if we're sorting by the same value
        // else make desc default when sorting by new value
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        // const selectedIndex = selected.indexOf(name);
        // let newSelected = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, name);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }

        // setSelected(newSelected);
        console.log("selected", name)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value || 5);
        setPage(0);
    };

    useEffect(() => {
        // reset page on data change
        setPage(0);
        setFilteredData(data);
    }, [data])

    useEffect(() => {
        if (isFiltered) {
            const start = new Date(startDateTime);
            const end = new Date(endDateTime);
            // filter by the start and end date time
            setFilteredData(data.filter(item => {
                var date = new Date(item[filterBy]);
                return start <= date && end >= date;
            }))
        } else {
            setFilteredData(data);
        }
    }, [isFiltered])

    const getShippingStatus = (status) => {
        switch (status) {
            case 0:
                return "Awaiting Shipment";
            case 1:
                return "Shipped";
            default:
                return "Delivered";
        }
    }

    const getShippingStatusColor = (status) => {
        switch (status) {
            case 0:
                return "#f44336";
            case 1:
                return "#ff9800";
            default:
                return "#4caf50";
        }
    }

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableToolbar 
                    title={title} 
                    isFiltered={isFiltered} 
                    setIsFiltered={setIsFiltered} 
                    setStartDateTime={setStartDateTime}
                    setEndDateTime={setEndDateTime}
                    filterBy={filterBy} />
                <TableContainer>
                    <Table
                        aria-labelledby={title}
                        size='medium'
                        aria-label="custom table"
                    >
                        <CustomTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headers={headers}
                        />
                        <TableBody>
                            {stableSort(filteredData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `custom-table-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.loadId)}
                                            key={row.loadId}
                                        >
                                            {
                                                headers.map((item, cellIndex) => {
                                                    if (item.id === 'shippingStatus')
                                                        return (
                                                            // shippingStatus: 0 = Awaiting Shipment, 1 = Shipped, 2 = Delivered
                                                            <TableCell key={`custom-table-cell-${cellIndex}`} align='right'>
                                                                <Chip label={getShippingStatus(row[item.id])}
                                                                    style={{
                                                                        backgroundColor: getShippingStatusColor(row[item.id]),
                                                                        color: "white"
                                                                    }} />
                                                            </TableCell>
                                                        );
                                                    else if (item.id === 'retailPrice' || item.id === 'price')
                                                        return (
                                                            <TableCell key={`custom-table-cell-${cellIndex}`} className={classes.body} align='right'>${numberWithCommas(row[item.id])}</TableCell>
                                                        );
                                                    else if (item.id === 'paid')
                                                        return (
                                                            <TableCell key={`custom-table-cell-${cellIndex}`} className={classes.body} align='right'>
                                                                <Chip label={row[item.id] ? "Paid" : "Unpaid"}
                                                                    style={{
                                                                        backgroundColor: row[item.id] ? "#4caf50" : "#f44336",
                                                                        color: "white"
                                                                    }} />
                                                            </TableCell>
                                                        );
                                                    else
                                                        return (
                                                            <TableCell key={`custom-table-cell-${cellIndex}`} className={classes.body} align={typeof row[item.id] === 'string' ? 'left' : 'right'}>{row[item.id]}</TableCell>
                                                        );
                                                })
                                            }
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
