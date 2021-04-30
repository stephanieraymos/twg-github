import React from "react";
import { Nav, Card } from "react-bootstrap";
import NarrowSearchForm from "./NarrowSearchForm"

const NarrowYourSearch = () => {
  return (
    <>
      <Card className="col-md-12 d-none d-md-block bg-light narrow-sidebar">Narrow your search
      <Card.Body>
          <NarrowSearchForm />
      </Card.Body>
      </Card>
    </>
  );
};

export default NarrowYourSearch;
