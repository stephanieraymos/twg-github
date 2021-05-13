import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
    Grid, 
    TextField, 
    Typography, 
    MenuItem, 
    ButtonGroup,
    Button,
    Chip,
} from '@material-ui/core';
import FileViewer from "react-file-viewer";
import CameraDialog from "./CameraDialog";
import useStyles from "./style"
import NoFileComponent from "./NoFileComponent";

export default function BillOfLadingView(props) {
    const classes = useStyles();
    const { id, data, setData, handleNext } = props
    const [errors, setErrors] = useState({});
    const facilities = [
        "T-01",
        "T-02",
        "T-03",
        "T-04"
    ]
    const [facility, setFacility] = useState(facilities[0]);
    const [bolFile, setBolFile] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [fileType, setFileType] = useState("");
    const [filePath, setFilePath] = useState("");

    // get current date to pre-fill the date area
    const getCurrentDateTime = () => {
        const date = new Date();
        return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
    }

    const [startDateTime, setStartDateTime] = useState(data["start"] || getCurrentDateTime());

    const convertStartDateTimeToReadableString = () => {
        const date = startDateTime.split('T')[0].split('-');
        const time = startDateTime.split('T')[1].split(':');
        const year = date[0];
        const month = date[1];
        const day = date[2];
        let hour = time[0];
        const minute = time[1];
        let timeOfDay = 'AM';

        if (hour > 11) {
            timeOfDay = 'PM';
            hour = (hour % 13) + 1;
        }

        return `${month}/${day}/${year} ${hour}:${minute} ${timeOfDay}`
    }

    useEffect(() => {
        if (data['bol_file'])
            setBolFile(data['bol_file']);
    }, [data])

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
            if (bolFile)
                data["bol_file"] = bolFile
            data['start'] = startDateTime
            setData(prevData => ({
                ...prevData,
                ...data
            }))
            // go to next page
            handleNext();
        }
    }

    const capture = useCallback((imageSrc) => {
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                var fileOfBlob = new File([blob], `${id}-bol.jpeg`, {
                    type: "image/jpeg",
                });
                setBolFile(fileOfBlob);
                closeCameraDialog();
            })
            .catch(error => console.log("Image Binary Conversion Error:", error))
    }, [setBolFile]);

    // Add file to a state variable
    const handleAddFile = (event) => {
        event.preventDefault();
        // set file
        setBolFile(event.target.files[0])
        // this part ensures that we can upload more files later on
        event.target.value = null
    }

    const handleDeleteFile = (event) => {
        event.preventDefault();
        setBolFile(null);
    }

    useEffect(() => {
        // set the file path and extension if there's a file
        if (bolFile) {
            setFilePath(URL.createObjectURL(bolFile));
            setFileType(bolFile.name.split('.').pop());
        } else {
            setFilePath("");
            setFileType("");
        }
    }, [bolFile])

    const openCameraDialog = () => setOpenCamera(true);
    const closeCameraDialog = () => setOpenCamera(false);

    return (
        <form onSubmit={handleOnSubmit} noValidate>
        <Grid 
            className={classes.root} 
            container 
            spacing={2}
            justify="center" >
            {/* Title */}
            <Grid item xs={6}>
                <Typography className={classes.title} 
                    gutterBottom
                    variant="h5"
                    component="h2" >
                    Bill of Lading
                </Typography>
            </Grid>

            {/* Start */}
            <Grid item xs={6}>
                <Typography className={classes.time}>
                    Started: {convertStartDateTimeToReadableString()}
                </Typography>
            </Grid>

            <Grid
                container 
                spacing={2}
                item
                xs={6} >
                    
                {/* Bill of Lading Number */}
                <Grid item xs={12}>
                    <Typography className={classes.label}>
                        Bill of Lading Number
                    </Typography>
                    <TextField
                        className={classes.textField}
                        required
                        id="bol"
                        variant="outlined"
                        name="bol"
                        error={!!errors["bol"]}
                        helperText={!!errors["bol"] ? "Please enter a valid BOL number" : ""}
                        defaultValue={data["bol"]}
                    />
                </Grid>
                {/* Pallet Number */}
                <Grid item xs={12}>
                    <Typography className={classes.label}>
                        Number of Pallets
                    </Typography>
                    <TextField
                        className={classes.textField}
                        required
                        id="pallet_count"
                        variant="outlined"
                        name="pallet_count"
                        error={!!errors["pallet_count"]}
                        helperText={!!errors["pallet_count"] ? "Please enter a valid number" : ""}
                        defaultValue={data["pallet_count"]}
                    />
                </Grid>
                {/* Facility */}
                <Grid item xs={12}>
                    <Typography className={classes.label}>
                        Facility
                    </Typography>
                    <TextField
                        className={classes.textField}
                        required
                        id="facility"
                        select
                        variant="outlined"
                        name="facility"
                        error={!!errors["facility"]}
                        helperText={!!errors["facility"] ? "Please select a facility" : ""}
                        value={facility}
                        onChange={(e) => setFacility(e.target.value)}
                        >
                        {facilities.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Add File Buttton */}
                <Grid item xs={12}>
                    <Typography className={classes.label}>
                        Attach File/Image
                    </Typography>
                    <Button className={classes.addFileButton} variant="contained" color="primary" size="large" component="label">
                        Add BOL File
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
                    bolFile != null &&
                    <Grid item xs={12}>
                        <Chip label={bolFile.name} onDelete={handleDeleteFile} color="primary" />
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

            {/* Next Buttton */}
            <Grid item className={classes.button}>
                <Button variant="contained" type="submit" color="primary" size="large" onClick={openCameraDialog}>
                    Next
                </Button>
            </Grid>

        </Grid>
        </form>
    );
}