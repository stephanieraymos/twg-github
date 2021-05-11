import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    TextField, 
    Typography, 
    MenuItem, 
    ButtonGroup,
    Button
} from '@material-ui/core';
import { validate } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        width: "100%",
    },
    textField: {
        width: "100%",
        fontFamily: "Montserrat, sans-serif",
    },
    title: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 700,
        color: theme.palette.text.primary,
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

export default function BillOfLadingView(props) {
    const classes = useStyles();
    const { data, setData, handleNext } = props
    const [errors, setErrors] = useState({});
    const facilities = [
        "T-01",
        "T-02",
        "T-03",
        "T-04"
    ]

    const handleOnSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        // get the form and put each key/value pair into the object
        const form = new FormData(event.currentTarget);
        const data = {};
        const allErrors = {};
        form.forEach((value, key) => {
            // set the errors if the value is blank
            if ((value && typeof value === "string") || (value && value.size && value.size > 0)) {
                data[key] = value
            } else {
                allErrors[key] = true
            }
        });

        setErrors(allErrors);

        if (Object.keys(allErrors).length == 0) {
            // append to current data object
            setData(prevData => ({
                ...prevData,
                ...data
            }))
            // go to next page
            handleNext();
        }
    }

    // get current date to pre-fill the date area
    const getCurrentDateTime = () => {
        const date = new Date();
        return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
    }

    return (
        <form onSubmit={handleOnSubmit} noValidate>
        <Grid className={classes.root} container spacing={2}>
            {/* Title */}
            <Grid item xs={7}>
                <Typography className={classes.title} 
                    gutterBottom
                    variant="h5"
                    component="h2" >
                    Bill of Lading
                </Typography>
            </Grid>
            {/* Received Date */}
            <Grid item xs={5}>
                <TextField
                    className={classes.textField}
                    required
                    id="created"
                    label="Received Date"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="created"
                    defaultValue={data["created"] || getCurrentDateTime()}
                    error={!!errors["created"]}
                />
            </Grid>
            {/* Bill of Lading Number */}
            <Grid item xs={6}>
                <TextField
                    className={classes.textField}
                    required
                    id="bol"
                    label="Bill of Lading Number"
                    variant="outlined"
                    type="number"
                    name="bol"
                    error={!!errors["bol"]}
                    helperText={!!errors["bol"] ? "Please enter a valid BOL number" : ""}
                    defaultValue={data["bol"]}
                />
            </Grid>
            {/* Bill of Lading File */}
            <Grid item xs={6}>
                <TextField
                    className={classes.textField}
                    required
                    id="bol_file"
                    type="file"
                    variant="outlined"
                    helperText="Please upload the Bill of Lading file or image"
                    name="bol_file"
                    error={!!errors["bol_file"]}
                />
            </Grid>
            {/* Pallet Number */}
            <Grid item xs={6}>
                <TextField
                    className={classes.textField}
                    required
                    id="pallet_count"
                    label="Number of Pallets"
                    variant="outlined"
                    type="number"
                    name="pallet_count"
                    error={!!errors["pallet_count"]}
                    helperText={!!errors["pallet_count"] ? "Please enter a valid number" : ""}
                    defaultValue={data["pallet_count"]}
                />
            </Grid>
            {/* Facility */}
            <Grid item xs={6}>
                <TextField
                    className={classes.textField}
                    required
                    id="facility"
                    select
                    label="Facility"
                    variant="outlined"
                    value={facilities[0]}
                    name="facility"
                    error={!!errors["facility"]}
                    defaultValue={data["facility"]}
                    >
                    {facilities.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            {/* Next Buttton */}
            <Grid container justify = "center" className={classes.button}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button type="submit" size="large">Next</Button>
                </ButtonGroup>
            </Grid>

        </Grid>
        </form>
    );
}