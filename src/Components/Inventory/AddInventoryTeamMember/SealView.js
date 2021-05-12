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
    Button, Chip
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
    },
    chip: {
        marginBottom: theme.spacing(1)
    }
}));

export default function SealView(props) {
    const classes = useStyles();
    const { data, setData, handleNext, handleBack } = props
    const [errors, setErrors] = useState({});
    const [hasSeal, setHasSeal] = useState(data["has_seal"] != null ? data["has_seal"] : true);
    const [isSealMatchBOL, setIsSealMatchBOL] = useState(data["seal_match"] != null ? data["seal_match"] : true);
    const [addPalletClick, setAddPalletClick] = useState(false);
    const [sealFile, setSealFile] = useState(null);

    const handleHasSealChange = (event) => {
        // reset values according to the options
        let value = event.target.value
        if (value === "Yes") {
            setHasSeal(true);
            delete data["seal_note_1"];
        } else {
            setHasSeal(false);
            delete data["seal"];
            delete data["seal_file"];
        }
    }

    const handleIsSealMatchBOLChange = (event) => {
        // reset values according to the options
        let value = event.target.value
        if (value === "Yes") {
            setIsSealMatchBOL(true);
            delete data["seal_note_2"];
        } else
            setIsSealMatchBOL(false);
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
            // add seal file if there's any
            if (sealFile)
                data["seal_file"] = sealFile
            // append to current data object
            setData(prevData => ({
                ...prevData,
                ...data,
                ["has_seal"]: hasSeal,
                ["seal_match"]: isSealMatchBOL
            }))

            // go to next page
            if (addPalletClick) {
                setAddPalletClick(false);
                handleNext();
            } else{
                // handleFinish();
            }
                
        }
    }

    // Add images to a state variable
    const handleAddFile = (event) => {
        event.preventDefault();
        // set file
        setSealFile(event.target.files[0])
        // this part ensures that we can upload more files later on
        event.target.value = null
    }

    const handleDeleteFile = (event) => {
        event.preventDefault();
        setSealFile(null);
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
                            name="has_seal"
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
                            defaultValue={data["seal_note_1"]}
                        />
                    </Grid>
                }

                {
                    hasSeal &&
                    <>
                        {/* Seal Number */}
                        <Grid item xs={7}>
                            <TextField
                                className={classes.textField}
                                required
                                id="seal"
                                label="Seal Number"
                                variant="outlined"
                                name="seal"
                                error={!!errors["seal"]}
                                helperText={!!errors["seal"] ? "Please enter a valid seal number" : ""}
                                defaultValue={data["seal"]}
                            />
                        </Grid>
                        {/* Seal Image */}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" size="large" component="label">
                                Add Seal Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleAddFile}
                                />
                            </Button>
                        </Grid>
                        {
                            sealFile != null &&
                            <Grid item xs={12}>
                                <Chip className={classes.chip} label={sealFile.name} onDelete={handleDeleteFile} color="primary" />
                            </Grid>
                        }
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
                            name="seal_match"
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
                            helperText={!!errors["seal_note_2"] ? "Please explain the mismatch seal numbers" : ""}
                            defaultValue={data["seal_note_2"]}
                        />
                    </Grid>
                }

                {/* Back & Next button */}
                <Grid container justify = "center" className={classes.button}>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button id="back" type="button" onClick={handleBack} size="large">Back</Button>
                        <Button id="add" type="submit" onClick={() => setAddPalletClick(true)} size="large">Add Pallet</Button>
                        <Button id="next" type="submit" size="large">Finish</Button>
                    </ButtonGroup>
                </Grid>

            </Grid>
        </form>
    );
}