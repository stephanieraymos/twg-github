import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography, 
    Button,
    Dialog,
    DialogTitle,
    DialogActions
} from '@material-ui/core';
import Webcam from "react-webcam";

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 700,
        color: theme.palette.text.primary,
        fontSize: 20
    },
    button: {
        '& > *': {
            fontFamily: "Montserrat, sans-serif",
            fontSize: 16
        }
    }
}));

export default function CameraDialog(props) {
    const classes = useStyles();
    const webcamRef = useRef(null);
    const { capture, open, handleClose } = props

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        capture(imageSrc);
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="Webcam" open={open}>
            <DialogTitle id="webcam-title">
                <Typography className={classes.title}>
                    Take a picture
                </Typography>
            </DialogTitle>
            <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
            <DialogActions className={classes.button}>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleCapture} color="primary">
                    Capture
                </Button>
            </DialogActions>
            
        </Dialog>
    );
}