import React from "react";
import { Nav, Card } from "react-bootstrap";
import NarrowSearchForm from "./NarrowSearchForm";

const NarrowYourSearch = () => {
  return (
    <>
      <Card className="col-md-12 d-none d-md-block bg-light narrow-sidebar">
        <Card.Title style={{borderBottom:"1px black solid"}}>Narrow your search</Card.Title>
        <Card.Body>
          <NarrowSearchForm />
        </Card.Body>
      </Card>
    </>
  );
};

export default NarrowYourSearch;
