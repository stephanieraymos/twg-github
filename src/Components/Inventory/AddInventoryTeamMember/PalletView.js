import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    TextField, 
    Typography, 
    MenuItem, 
    ButtonGroup,
    Button,
    FormLabel,
    FormControl,
    FormControlLabel,
    Checkbox, 
    FormGroup,
    InputAdornment,
    IconButton,
    Chip
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';


// label: bol #, ficility, Pallet id and barcode, lane

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
        margin: theme.spacing(1)
    }
}));

export default function PalletView(props) {
    const classes = useStyles();
    const { index, palletId, pallets, setPallets, handleNext, handleBack, handleFinish } = props
    const [errors, setErrors] = useState({});
    const heights = [
        "0 - 6 inches",
        "6 - 12 inches",
        "12 - 18 inches",
        "18 - 24 inches",
        "24 - 30 inches",
        "30 - 36 inches",
        "36 - 42 inches",
        "42 - 48 inches",
        "Over 48 inches"
    ]
    const [height, setHeight] = useState(heights[8]);
    const [exceptions, setExceptions] = useState({
        "Display Only": false,
        "Store Fixture" : false,
        "Undersized" : false,
        "Other" : false
    });
    const [notes, setNotes] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [hasExisting, setHasExisting] = useState(false);

    useEffect(() => {
        // pre-fill with existing data if there is one
        if (pallets[palletId] != null) {
            setHasExisting(true);
            setHeight(pallets[palletId]["height"]);
            setNotes(pallets[palletId]["notes"]);
            setImageFiles(pallets[palletId]["images"]);
            const prevExceptions = pallets[palletId]["exceptions"]
            setExceptions({
                "Display Only": prevExceptions.includes("Display Only"),
                "Store Fixture" : prevExceptions.includes("Store Fixture"),
                "Undersized" : prevExceptions.includes("Undersized"),
                "Other" : prevExceptions.includes("Other"),
            })
        }
    }, [pallets])

    // Add images to a state variable
    const handleAddImagesClick = (event) => {
        event.preventDefault();
        // get the images into an array and append it to current image array
        let tempImages = []
        for (const image of event.target.files) {
            tempImages.push(image)
        }
        setImageFiles(prev => [...prev, ...tempImages]);
        // this part ensures that we can upload more files later on
        event.target.value = null
    }

    const handleDeleteImage = (name) => {
        // remove the file with the name
        // files can never have the same name and extension so using this combo should remove the unique file
        const tempImages = imageFiles.filter(file => file.name != name);
        setImageFiles(tempImages);
    };

    const handleExceptionsChange = (event) => {
        setExceptions(prevExceptions => ({...prevExceptions, [event.target.name]: event.target.checked}));
    };

    const handleAddAndSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let exception = []
        // get all the checked exceptions
        Object.entries(exceptions).forEach(([key, value]) => {
            if (value)
                exception.push(key)
        })

        let pallet = {
            "pallet_id": palletId,
            "exceptions": exception,
            "height": height,
            "images": imageFiles,
            "notes": '',
        }

        // Only add notes if 'Other' is checked
        if (exception.includes("Other")) {
            pallet["notes"] = notes
        }

        // add pallet to existing list of pallets
        setPallets(prevPallets => ({
            ...prevPallets, 
            [palletId]: pallet
        }));
    };

    const handleAddPallet = (event) => {
        handleAddAndSubmit(event);
        handleNext();
    }

    const handleOnSubmit = (event) => {
        handleAddAndSubmit(event);
        handleFinish();
    }

    return (
        <form onSubmit={handleOnSubmit} noValidate>
        <Grid className={classes.root} container spacing={2}>
            {/* Title */}
            <Grid item xs={12}>
                <Typography className={classes.title} 
                    gutterBottom
                    variant="h5"
                    component="h2" >
                    Pallet #{index}
                </Typography>
            </Grid>
            {/* Pallet ID */}
            <Grid item xs={6}>
                <TextField
                    className={classes.textField}
                    disabled
                    id="pallet_id"
                    label="Pallet ID"
                    variant="outlined"
                    name="pallet_id"
                    defaultValue={palletId}
                />
            </Grid>
            {/* Height */}
            <Grid item xs={6}>
                <TextField
                    className={classes.textField}
                    required
                    id="height"
                    select
                    label="Height"
                    variant="outlined"
                    name="height"
                    error={!!errors["height"]}
                    helperText={!!errors["height"] ? "Please select a height" : ""}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    >
                    {heights.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" component="label">
                    Add Images
                    <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleAddImagesClick}
                    />
                </Button>
            </Grid>

            <Grid item xs={12}>
                {
                    imageFiles.map((value, index) => {
                        return (
                            <Chip className={classes.chip} key={index} label={value.name} onDelete={() => handleDeleteImage(value.name)} color="primary" />
                        );
                    })
                }
            </Grid>

            {/* Exceptions */}
            <Grid item xs={12}>
                <FormControl error={!!errors["exceptions"]} component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Exceptions</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={exceptions["Display Only"]} onChange={handleExceptionsChange} name="Display Only" />}
                            label="Display Only"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={exceptions["Store Fixture"]} onChange={handleExceptionsChange} name="Store Fixture" />}
                            label="Store Fixture"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={exceptions["Undersized"]} onChange={handleExceptionsChange} name="Undersized" />}
                            label="Undersized"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={exceptions["Other"]} onChange={handleExceptionsChange} name="Other" />}
                            label="Other"
                        />
                    </FormGroup>
                </FormControl>
            </Grid>

            {
                exceptions["Other"] &&
                <Grid item xs={12}>
                    <TextField
                        className={classes.textField}
                        id="notes"
                        label='Please explain "Other"'
                        multiline
                        rows={3}
                        variant="outlined"
                        required
                        name="notes"
                        error={!!errors["notes"]}
                        helperText={!!errors["notes"] ? 'Please explain "Other"' : ""}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </Grid>
            }

            {/* Back & Next button */}
            <Grid container justify = "center" className={classes.button}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button id="back" type="button" onClick={handleBack} size="large">Back</Button>
                    <Button id="add" type="button" onClick={handleAddPallet} size="large">{hasExisting ? "Save & Continue" : "Add Another Pallet"}</Button>
                    <Button id="next" type="submit" size="large">Finish</Button>
                </ButtonGroup>
            </Grid>

        </Grid>
        </form>
    );
}