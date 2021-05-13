import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
    Grid, 
    TextField, 
    Typography, 
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    ButtonGroup,
    Button, Chip
} from '@material-ui/core';
import useStyles from "./style";
import FileViewer from "react-file-viewer";
import CameraDialog from "./CameraDialog";
import NoFileComponent from "./NoFileComponent";

export default function SealView(props) {
    const classes = useStyles();
    const { id, data, setData, handleNext, handleBack, handleFinish } = props
    const [errors, setErrors] = useState({});
    const [hasSeal, setHasSeal] = useState(data["has_seal"] != null ? data["has_seal"] : true);
    const [isSealMatchBOL, setIsSealMatchBOL] = useState(data["seal_match"] != null ? data["seal_match"] : true);
    const [addPalletClick, setAddPalletClick] = useState(false);
    const [sealFile, setSealFile] = useState(null);
    const [hasExisting, setHasExisting] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);
    const [fileType, setFileType] = useState("");
    const [filePath, setFilePath] = useState("");

    useEffect(() => {
        if (data['seal_file']) {
            setHasExisting(true);
            setSealFile(data['seal_file']);
        }
    }, [data])

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
            if (sealFile && hasSeal)
                data["seal_file"] = sealFile
            // append to current data object
            setData(prevData => ({
                ...prevData,
                ...data,
                ["has_seal"]: hasSeal,
                ["seal_match"]: isSealMatchBOL
            }))

            setAddPalletClick(false);

            // go to next page
            if (addPalletClick) {
                handleNext();
            } else{
                handleFinish();
            }
                
        }
    }

    const capture = useCallback((imageSrc) => {
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                var fileOfBlob = new File([blob], `${id}-bol.jpeg`, {
                    type: "image/jpeg",
                });
                setSealFile(fileOfBlob);
                closeCameraDialog();
            })
            .catch(error => console.log("Image Binary Conversion Error:", error))
    }, [setSealFile]);

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

    useEffect(() => {
        // set the file path and extension if there's a file
        if (sealFile) {
            setFilePath(URL.createObjectURL(sealFile));
            setFileType(sealFile.name.split('.').pop());
        } else {
            setFilePath("");
            setFileType("");
        }
    }, [sealFile])

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
                    <Typography 
                        className={classes.title} 
                        gutterBottom
                        variant="h5"
                        component="h2" >
                        Seal Information
                    </Typography>
                </Grid>
                <Grid
                    container 
                    spacing={2}
                    item
                    xs={6}>

                    {/* Is Seal Available */}
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel className={classes.label}>Does the truck have a seal?</FormLabel>
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
                        <Grid item xs={12}>
                            <Typography className={classes.label}>
                                Explain
                            </Typography>
                            <TextField
                                className={classes.textField}
                                id="seal_note_1"
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
                            <Grid item xs={12}>
                                <Typography className={classes.label}>
                                    Seal Number
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    required
                                    id="seal"
                                    variant="outlined"
                                    name="seal"
                                    error={!!errors["seal"]}
                                    helperText={!!errors["seal"] ? "Please enter a valid seal number" : ""}
                                    defaultValue={data["seal"]}
                                />
                            </Grid>
                            {/* Add File Buttton */}
                            <Grid item xs={12}>
                                <Typography className={classes.label}>
                                    Attach File/Image
                                </Typography>
                                <Button className={classes.addFileButton} variant="contained" color="primary" size="large" component="label">
                                    Add Seal Image
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleAddFile}
                                    />
                                </Button>
                                <Button variant="contained" color="primary" size="large" onClick={openCameraDialog}>
                                    Take a picture
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
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel className={classes.label2}>Does the seal number match the number in the Bill of Lading?</FormLabel>
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
                        <Grid item xs={12}>
                            <Typography className={classes.label}>
                                Explain
                            </Typography>
                            <TextField
                                className={classes.textField}
                                id="seal_note_2"
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

                </Grid>
                <Grid
                    container 
                    spacing={2}
                    item
                    xs={6}>

                    <Grid item xs={12}>
                        <Typography className={classes.label}>
                            File/Image Preview
                        </Typography>
                        <div style={{height: "400px", overflowY: 'scroll'}}>
                            <FileViewer
                                fileType={fileType} 
                                filePath={filePath}
                                errorComponent={NoFileComponent}
                                unsupportedComponent={NoFileComponent}
                                onError={e => console.log(e, "error in file-viewer")} />
                        </div>
                    </Grid>

                </Grid>
                
                <CameraDialog capture={capture} open={openCamera} handleClose={closeCameraDialog} />

                {/* Back & Next & Finish button */}
                <Grid item className={classes.button}>
                    <Button variant="contained" type="button" onClick={handleBack} color="primary" size="large">
                        Back
                    </Button>
                </Grid>

                <Grid item className={classes.button}>
                    <Button variant="contained" type="submit" onClick={() => setAddPalletClick(true)} color="primary" size="large">
                        {hasExisting ? "Save & Continue" : "Add Pallet"}
                    </Button>
                </Grid>

                <Grid item className={classes.button}>
                    <Button variant="contained" type="submit" color="primary" size="large">
                    Finish
                    </Button>
                </Grid>

            </Grid>
        </form>
    );
}