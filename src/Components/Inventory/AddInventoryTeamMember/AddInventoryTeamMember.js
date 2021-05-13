import React, { useEffect, useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Stepper,
    Step,
    StepButton,
    Typography,
    Paper
} from '@material-ui/core';
import BillOfLadingView from "./BillOfLadingView";
import SealView from "./SealView";
import PalletView from "./PalletView";
import { v4 as uuidv4 } from "uuid";
import { useInventoryContext } from "../../../context/inventory";
import Navigation from "../../Navigation/Navigation";

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
        margin: theme.spacing(5),
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
    const [handleFinishClick, setHandleFinishClick] = useState(false);

    const { addInventory } = useInventoryContext();

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

    const handleFinish = () => {
        setHandleFinishClick(true);
    }

    const performPOST = () => {
        const formData = new FormData();
        // append all the data into FormData
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        });
        // append all the pallet data into FormData
        const palletData = []
        // Grab all the pallet data except images
        // Get images and append to form daat seperately
        Object.entries(pallets).forEach(([key, value]) => {
            palletData.push({
                'pallet_id': value['pallet_id'],
                'height': value['height'],
                'exceptions': value['exceptions'],
                'notes': value['notes'],
            })
            // create an array in FormData
            for (const image of value['images']) {
                formData.append(`pallet_images_${key}`, image);
            }
        });
        formData.append("pallets", JSON.stringify(palletData));
        addInventory(formData)
            .then((data) => {
                console.log("data added", data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (handleFinishClick) {
            performPOST();
        }
    }, [data])

    useEffect(() => {
        if (handleFinishClick) {
            performPOST();
        }
    }, [pallets])

    return (
        <div className={classes.root}>
            <div>
              <Navigation />
            </div>
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
                    <BillOfLadingView id={`${data["facility"]}-${id}`} data={data} setData={setData} handleNext={handleNext} />
                }
                {
                    activeStep == 1 &&
                    <SealView id={`${data["facility"]}-${id}`} data={data} setData={setData} handleNext={handleNext} handleBack={handleBack} handleFinish={handleFinish} />
                }
                {
                    activeStep >= 2 &&
                    new Array(activeStep - 1).fill(0).map((value, index) =>{
                        // only show the view that match the current active step
                        const currentIndex = index + 1;
                        if (currentIndex == activeStep - 1)
                            return (
                                <PalletView key={index} index={currentIndex} palletId={`${data["facility"]}-${id}-${currentIndex}`} pallets={pallets} setPallets={setPallets} handleNext={handleNext} handleBack={handleBack} handleFinish={handleFinish} />
                            );
                    })
                }
            </Paper>
        </div>
    );

}