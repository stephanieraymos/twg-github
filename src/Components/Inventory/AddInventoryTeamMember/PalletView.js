import React, { useEffect, useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    TextField, 
    Typography, 
    MenuItem, 
    Button,
    FormLabel,
    FormControl,
    FormControlLabel,
    Checkbox, 
    FormGroup,
    Chip,
    GridList,
    GridListTile,
    FormHelperText
} from '@material-ui/core';
import useStyles from "./style";
import CameraDialog from "./CameraDialog";
import NoFileComponent from "./NoFileComponent";

// label: bol #, facility, Pallet id and barcode, lane

export default function PalletView(props) {
    const classes = useStyles();
    const { index, palletId, pallets, setPallets, handleNext, handleBack } = props
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
        "48+ inches"
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
    const [openCamera, setOpenCamera] = useState(false);

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

    const capture = useCallback((imageSrc) => {
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                var fileOfBlob = new File([blob], `${palletId}-img-${imageFiles.length + 1}.jpeg`, {
                    type: "image/jpeg",
                });
                setImageFiles(prev => [...prev, fileOfBlob]);
            })
            .catch(error => console.log("Image Binary Conversion Error:", error))
    }, [imageFiles, setImageFiles]);

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

        const allErrors = {};

        if (imageFiles.length == 0)
            allErrors['images'] = true

        if (exceptions["Other"])
            allErrors['notes'] = true

        setErrors(allErrors);

        if (Object.keys(allErrors).length == 0) {
            handleAddAndSubmit(event);
            handleNext();
        }
    }

    const handleOnSubmit = (event) => {

        const allErrors = {};

        if (imageFiles.length == 0)
            allErrors['images'] = true

        if (exceptions["Other"])
            allErrors['notes'] = true

        setErrors(allErrors);

        if (Object.keys(allErrors).length == 0) {
            handleAddAndSubmit(event);
            handleNext(true);
        }
    }

    const openCameraDialog = () => setOpenCamera(true);
    const closeCameraDialog = () => setOpenCamera(false);

    return (
        <form onSubmit={handleOnSubmit} noValidate>
        <Grid 
            className={classes.root} 
            container 
            spacing={2}
            justify="space-between">
            {/* Title */}
            <Grid item xs={12}>
                <Typography className={classes.title} 
                    gutterBottom
                    variant="h5"
                    component="h2" >
                    Pallet #{index}
                </Typography>
            </Grid>
            <Grid
                container 
                spacing={2}
                item
                xs={6}>

                {/* Pallet ID */}
                <Grid item xs={12}>
                    <Typography className={classes.label}>
                        Pallet ID
                    </Typography>
                    <TextField
                        className={classes.textField}
                        disabled
                        id="pallet_id"
                        variant="outlined"
                        name="pallet_id"
                        defaultValue={palletId}
                    />
                </Grid>
                {/* Height */}
                <Grid item xs={12}>
                    <Typography className={classes.label}>
                        Height
                    </Typography>
                    <TextField
                        className={classes.textField}
                        required
                        id="height"
                        select
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
                    <Typography className={classes.label}>
                        Attach Images
                    </Typography>
                    <Button id="add-image" className={classes.addFileButton} variant="contained" color="primary" size="large" component="label">
                        Add Images
                        <input
                            type="file"
                            multiple
                            hidden
                            onChange={handleAddImagesClick}
                        />
                    </Button>
                    <Button id="take-pictures" variant="contained" color="primary" size="large" onClick={openCameraDialog}>
                        Take pictures
                    </Button>
                    {
                        !!errors["images"] &&
                        <FormHelperText className={classes.helperText}>Please images of the pallet</FormHelperText>
                    }
                </Grid>

                {
                    imageFiles.length > 0 &&
                    <Grid item xs={12}>
                        {
                            imageFiles.map((value, index) => {
                                return (
                                    <Chip className={classes.chip} key={index} label={value.name} onDelete={() => handleDeleteImage(value.name)} color="primary" />
                                );
                            })
                        }
                    </Grid>
                }

                {/* Exceptions */}
                <Grid item xs={12}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel className={classes.label}>Exceptions</FormLabel>
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
                        <Typography className={classes.label}>
                            Explain "Other"
                        </Typography>
                        <TextField
                            className={classes.textField}
                            id="notes"
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
            </Grid>

            {/* File/Image Preview */}
            <Grid
                container 
                spacing={2}
                item
                xs={6}>

                <Grid item xs={12}>
                    <Typography className={classes.label}>
                        Image Preview
                    </Typography>
                    <NoFileComponent></NoFileComponent>
                    <GridList cellHeight={300} className={classes.gridList} cols={2}>
                        {imageFiles.map((image, index) => (
                            <GridListTile key={index}>
                                <img src={URL.createObjectURL(image)} alt={`image ${index}`} />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>

            <CameraDialog capture={capture} open={openCamera} handleClose={closeCameraDialog} />

            {/* Back & Next & Finish button */}
            <Grid item className={classes.button}>
                <Button id="back" variant="contained" type="button" onClick={handleBack} color="primary" size="large">
                    Back
                </Button>
            </Grid>

            <Grid item className={classes.button}>
                <Button id="continue" variant="contained" type="button" onClick={handleAddPallet} color="primary" size="large">
                    {hasExisting ? "Save & Continue" : "Save & Add Another Pallet"}
                </Button>
            </Grid>

            <Grid item className={classes.button}>
                <Button id="finish" variant="contained" type="submit" color="primary" size="large">
                    Save & Review
                </Button>
            </Grid>

        </Grid>
        </form>
    );
}