import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    '& > *': {
        margin: theme.spacing(1),
        width: '40%',
      },
  },
}));

export default function BillOfLadingView(props) {
    const classes = useStyles();
    const { index, refs, validated, next } = props
    const facilities = [
        "T-01",
        "T-02",
        "T-03",
        "T-04"
    ]

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    required
                    id="bill-of-lading"
                    label="Bill of Lading #"
                    variant="outlined"
                    type="number"
                    name="bol"
                />
                <TextField
                    required
                    id="bill-of-lading"
                    label="# of Pallets"
                    variant="outlined"
                    name="pallet_count"
                />
            </form>
            {/* <Form
                ref={refs[index]}
                noValidate
                validated={validated}
                onSubmit={next}
                className={classes.root}
            >
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label className="form-label">Bill of Lading #</Form.Label>
                            <Form.Control type="text" required name="bol" />
                            <Form.Control.Feedback type="invalid">
                                Please enter the bill of lading number.
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label className="form-label"># of Pallets</Form.Label>
                            <Form.Control type="text" required name="pallet_count" />
                            <Form.Control.Feedback type="invalid">
                                Please enter the expected number of pallets.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label className="form-label">Facility</Form.Label>
                            <Form.Control as="select" name="facility">
                                {
                                    facilities.map(value => {
                                        return (
                                            <option>{value}</option>
                                        );
                                    })
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please enter retail price.
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label className="form-label"># of Pallets</Form.Label>
                            <TextField
                                id="datetime"
                                type="datetime-local"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter our price.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                
            </Form> */}
        </>
    );
}