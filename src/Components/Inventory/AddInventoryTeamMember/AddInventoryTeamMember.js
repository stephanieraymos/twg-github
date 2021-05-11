import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { color } from 'd3-color';
import BillOfLadingView from "./BillOfLadingView";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    stepper: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        color: "#000"
    },
    stepperButton: {
        margin: 'auto'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(5),
        marginLeft: theme.spacing(5),
        borderRadius: 20,
    }
}));

export default function AddInventoryTeamMember() {

    const classes = useStyles();
    const [refs, setRefs] = useState([useRef(null), useRef(null)]);
    const [validated, setValidated] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [palletCount, setPalletCount] = useState(1);
    const [completed, setCompleted] = React.useState({});
    const steps = [
        'Bill of Lading',
        'Seal',
        'Pallet #1'
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper nonLinear alternativeLabel activeStep={activeStep}>
                {steps.map((label, index) => (
                <Step key={label}>
                    <StepButton className={classes.stepper} onClick={() => setActiveStep(index)} completed={true}>
                        <Typography className={classes.stepper}>
                            {label}
                        </Typography>
                    </StepButton>
                </Step>
                ))}
            </Stepper>
            <Paper className={classes.paper}>
                <BillOfLadingView index={0} refs={refs} validated={validated} next={handleNext} />
            </Paper>
            {/* <div>
                {activeStep === steps.length ? (
                    <div>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div> */}
        </div>
    );

}