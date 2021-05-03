import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useInventoryContext } from "../../../inventory";

const NarrowSearchForm = () => {
  const { inventory } = useInventoryContext();
  //^ FOB MAP + SET
  const mappedFob = inventory.map((item) => {
    let { fob } = item;
    return fob;
  });
  const uniqueFobSet = new Set(mappedFob);
  const setFobArr = [...uniqueFobSet]; //Creating new array with Set (no duplicates)

  //^ CATEGORIES MAP + SET
  const mappedCategories = inventory.map((item) => {
    let { category } = item;
    return category;
  });
  const uniqueCategorySet = new Set(mappedCategories);
  const setCategoriesArr = [...uniqueCategorySet]; //Creating new array with Set (no duplicates)

  //^ HANDLE CLICK
  const handleClick = () => {
    console.log("checked");
  };
  
  return (
    <>
      <Form className={`${window.innerWidth <= 1024 ? "form-flex" : null}`}>
        <Row>
          <Col>
            <Form.Group name="fob">
              <Form.Label className="form-label-styles">Location</Form.Label>

              {setFobArr.map((item, index) => {
                return (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={item}
                    onClick={() => {
                      handleClick();
                    }}
                  />
                );
              })}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="form-label-styles">Categories</Form.Label>
              {setCategoriesArr.map((item, index) => {
                return (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={item}
                    onClick={() => {
                      handleClick();
                    }}
                  />
                );
              })}
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
