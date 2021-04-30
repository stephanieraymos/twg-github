import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const NarrowSearchForm = () => {
  return (
    <>
      <Form className={`${window.innerWidth <= 1024 ? "form-flex" : null}`}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="form-label-styles">Location</Form.Label>
              <Form.Check type="checkbox" label="Sacramento" />
              <Form.Check type="checkbox" label="Woodland" />
              <Form.Check type="checkbox" label="Roseville" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="form-label-styles">Categories</Form.Label>
              <Form.Check type="checkbox" label="Clothing" />
              <Form.Check type="checkbox" label="Office" />
              <Form.Check type="checkbox" label="Home" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="form-label-styles">Units</Form.Label>
              <Form.Check type="checkbox" label="100-1000" />
              <Form.Check type="checkbox" label="1000-2500" />
              <Form.Check type="checkbox" label="2500-5000" />
              <Form.Check type="checkbox" label="5000-10000" />
              <Form.Check type="checkbox" label="10000+" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="form-label-styles">Price</Form.Label>
              <Form.Check type="checkbox" label="$5,000 or less" />
              <Form.Check type="checkbox" label="$5,000 - $10,000" />
              <Form.Check type="checkbox" label="$10,000+" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="form-label-styles">Condition</Form.Label>
              <Form.Check type="checkbox" label="Overstock" />
              <Form.Check type="checkbox" label="Returns" />
              <Form.Check type="checkbox" label="Salvage" />
              <Form.Check type="checkbox" label="Shelf Pulls" />
              <Form.Check type="checkbox" label="Warehouse Damage" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default NarrowSearchForm;
