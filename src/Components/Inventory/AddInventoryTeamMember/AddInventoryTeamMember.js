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
import SealView from "./SealView";
import PalletView from "./PalletView";
import { v4 as uuidv4 } from "uuid";

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
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginLeft: theme.spacing(5),
        borderRadius: 20,
    }
}));

export default function AddInventoryTeamMember() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [pallets, setPallets] = useState({});
    const [completed, setCompleted] = useState({});
    const [steps, setSteps] = useState([
        'Bill of Lading',
        'Seal'
    ]);
    const [data, setData] = useState({});
    const [id, setId] = useState(uuidv4().substring(0,8));

    const handleNext = () => {
        setCompleted(prevCompleted => ({
            ...prevCompleted,
            [activeStep]: true
        }));
        const newActiveStep = activeStep + 1
        setActiveStep(newActiveStep);
        const newTitle = `Pallet #${newActiveStep - 1}`
        if (newActiveStep > 1 && !steps.includes(newTitle)) {
            setSteps(prevSteps => [...prevSteps, newTitle])
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        console.log("data", data);
    }, [data])

    useEffect(() => {
        console.log("pallets", pallets);
    }, [pallets])

    return (
        <div className={classes.root}>
            <Stepper nonLinear alternativeLabel activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton className={classes.stepper} onClick={() => setActiveStep(index)} completed={completed[index]}>
                            <Typography className={classes.stepper}>
                                {label}
                            </Typography>
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Paper className={classes.paper}>
                {
                    activeStep == 0 &&
                    <BillOfLadingView data={data} setData={setData} handleNext={handleNext} />
                }
                {
                    activeStep == 1 &&
                    <SealView data={data} setData={setData} handleNext={handleNext} handleBack={handleBack} />
                }
                {
                    activeStep >= 2 &&
                    new Array(activeStep - 1).fill(0).map((value, index) =>{
                        // only show the view that match the current active step
                        const currentIndex = index + 1;
                        if (currentIndex == activeStep - 1)
                            return (
                                <PalletView key={index} index={currentIndex} palletId={`${data["facility"]}-${id}-${currentIndex}`} pallets={pallets} setPallets={setPallets} handleNext={handleNext} handleBack={handleBack} />
                            );
                    })
                }
            </Paper>
        </div>
    );

}