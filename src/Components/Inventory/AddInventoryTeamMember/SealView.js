import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    TextField, 
    Typography, 
    MenuItem, 
    Divider,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    ButtonGroup,
    Button
} from '@material-ui/core';

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
    const { data, setData, handleNext, handleBack } = props
    const [errors, setErrors] = useState({});
    const [hasSeal, setHasSeal] = useState(data["has_seal"] || true);
    const [isSealMatchBOL, setIsSealMatchBOL] = useState(data["seal_match"] || true);

    const handleHasSealChange = (event) => {
        let value = event.target.value
        if (value === "Yes")
            setHasSeal(true)
        else
            setHasSeal(false)
    }

    const handleIsSealMatchBOLChange = (event) => {
        let value = event.target.value
        if (value === "Yes")
            setIsSealMatchBOL(true)
        else
            setIsSealMatchBOL(false)
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
            setData(prevData => ({
                ...prevData,
                ...data,
                ["has_seal"]: hasSeal,
                ["seal_match"]: isSealMatchBOL
            }))
            // go to next page
            handleNext();
        }
    }

    return (
        <form onSubmit={handleOnSubmit} noValidate>
            <Grid className={classes.root} container spacing={2}>
                {/* Title */}
                <Grid item xs={12}>
                    <Typography 
                        className={classes.title} 
                        gutterBottom
                        variant="h5"
                        component="h2" >
                        Seal Information
                    </Typography>
                </Grid>
                {/* Is Seal Available */}
                <Grid item xs={hasSeal ? 7 : 6}>
                    <FormControl component="fieldset">
                        <FormLabel>Does the truck have a seal?</FormLabel>
                        <RadioGroup aria-label="hasSeal" 
                            row={true}
                            value={hasSeal ? "Yes" : "No"} 
                            onChange={handleHasSealChange}
                            required
                        >
                            <FormControlLabel 
                                control={<Radio color="primary" />}
                                label="Yes"
                                value="Yes" />
                            <FormControlLabel 
                                control={<Radio color="primary" />}
                                label="No"
                                value="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {
                    !hasSeal &&
                    <Grid item xs={6}>
                        <TextField
                            className={classes.textField}
                            id="seal_note_1"
                            label="Explain"
                            multiline
                            rows={3}
                            variant="outlined"
                            required
                            name="seal_note_1"
                            error={!!errors["seal_note_1"]}
                            helperText={!!errors["seal_note_1"] ? "Please explain why there's no seal" : ""}
                        />
                    </Grid>
                }

                {
                    hasSeal &&
                    <>
                        {/* Seal Number */}
                        <Grid item xs={6}>
                            <TextField
                                className={classes.textField}
                                required
                                id="seal"
                                label="Seal Number"
                                variant="outlined"
                                type="number"
                                name="seal"
                                error={!!errors["seal"]}
                                helperText={!!errors["seal"] ? "Please enter a valid seal number" : ""}
                            />
                        </Grid>
                        {/* Seal Image */}
                        <Grid item xs={6}>
                            <TextField
                                className={classes.textField}
                                required
                                id="seal_file"
                                type="file"
                                variant="outlined"
                                helperText="Please upload an image or file of the seal*"
                                name="seal_file"
                                error={!!errors["seal_file"]}
                            />
                        </Grid>
                    </>
                }

                {/* Does Seal Match Number on BOL */}
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel>Does the seal number match the number in the Bill of Lading?</FormLabel>
                        <RadioGroup aria-label="hasSeal" 
                            row={true}
                            value={isSealMatchBOL ? "Yes" : "No"} 
                            onChange={handleIsSealMatchBOLChange}
                            required
                        >
                            <FormControlLabel 
                                control={<Radio color="primary" />}
                                label="Yes"
                                value="Yes" />
                            <FormControlLabel 
                                control={<Radio color="primary" />}
                                label="No"
                                value="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {
                    !isSealMatchBOL &&
                    <Grid item xs={6}>
                        <TextField
                            className={classes.textField}
                            id="seal_note_2"
                            label="Explain"
                            multiline
                            rows={3}
                            variant="outlined"
                            required
                            name="seal_note_2"
                            error={!!errors["seal_note_2"]}
                            helperText={!!errors["seal_note_2"] ? "Please explain why the mismatch seal numbers" : ""}
                        />
                    </Grid>
                }

                {/* Back & Next button */}
                <Grid container justify = "center" className={classes.button}>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button id="back" type="button" onClick={handleBack} size="large">Back</Button>
                        <Button id="next" type="submit" size="large">Next</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>
        </form>
    );
}