import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
    Grid, 
    Typography, 
    Button,
} from '@material-ui/core';
import useStyles from "./style"

export default function FinishView(props) {
    const classes = useStyles();
    const { pallets, data, setData, handleBack, handleFinish } = props
    const [errors, setErrors] = useState({});
    const [palletLength, setPalletLength] = useState(Object.keys(pallets).length);
    const [bolPalletLength, setBolPalletLength] = useState(data['pallet_count'])

    // get current date to pre-fill the date area
    const getCurrentDateTime = () => {
        const date = new Date();
        return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
    }

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
            data['end'] = getCurrentDateTime();
            setData(prevData => ({
                ...prevData,
                ...data
            }))
            // go to next page
            handleFinish();
        }
    }

    return (
        <form onSubmit={handleOnSubmit} noValidate>
            <Grid
                className={classes.root} 
                container 
                spacing={2}
                justify="space-between" >
                {/* Title */}
                <Grid item xs={12}>
                    <Typography className={classes.title} 
                        gutterBottom
                        variant="h5"
                        component="h2" >
                        Review
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.label3}>
                        {
                            palletLength == bolPalletLength ?
                            (
                                `You have added ${palletLength} pallets which matched the number on the BOL (${bolPalletLength}). Press FINISH to finish adding the truck.`
                            ):
                            (
                                `You have added ${palletLength} pallets which doesn't match the number on the BOL (${bolPalletLength}). Press FINISH if this is correct to finish adding the truck.`
                            )
                        }
                    </Typography>
                </Grid>

                {/* Back & Next & Finish button */}
                <Grid item className={classes.button}>
                    <Button id="review-back" variant="contained" type="button" onClick={handleBack} color="primary" size="large">
                        Back
                    </Button>
                </Grid>

                <Grid item className={classes.button}>
                    <Button id="review-finish" variant="contained" type="submit" color="primary" size="large">
                        Finish
                    </Button>
                </Grid>

            </Grid>
        </form>
    );
}