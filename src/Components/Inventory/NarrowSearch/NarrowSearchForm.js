import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const NarrowSearchForm = () => {
  return (
    <>
      <Form className={`${window.innerWidth <= 1024 ? "form-flex" : null}`}>
        <Form.Group >
          <Form.Label>Location</Form.Label>
          <Form.Check type="checkbox" label="Sacramento" />
          <Form.Check type="checkbox" label="Woodland" />
          <Form.Check type="checkbox" label="Roseville" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Categories</Form.Label>
          <Form.Check type="checkbox" label="Clothing" />
          <Form.Check type="checkbox" label="Office" />
          <Form.Check type="checkbox" label="Home" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Size</Form.Label>
          <Form.Check type="checkbox" label="100-1000" />
          <Form.Check type="checkbox" label="1000-2500" />
          <Form.Check type="checkbox" label="2500-5000" />
          <Form.Check type="checkbox" label="5000-10000" />
          <Form.Check type="checkbox" label="10000+" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price Range</Form.Label>
          <Form.Check type="checkbox" label="$5,000 and under" />
          <Form.Check type="checkbox" label="$5,000 - $10,000" />
          <Form.Check type="checkbox" label="$10,000 and up" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Condition</Form.Label>
          <Form.Check type="checkbox" label="Overstock" />
          <Form.Check type="checkbox" label="Returns" />
          <Form.Check type="checkbox" label="Salvage" />
          <Form.Check type="checkbox" label="Shelf Pulls" />
          <Form.Check type="checkbox" label="Warehouse Damage" />
        </Form.Group>
      </Form>
    </>
  );
};

export default NarrowSearchForm;
