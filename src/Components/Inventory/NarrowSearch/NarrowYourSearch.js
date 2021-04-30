import React from "react";
import { Nav, Card } from "react-bootstrap";
import NarrowSearchForm from "./NarrowSearchForm";
import NarrowSearchFormMobile from "./NarrowSearchFormMobile";

const NarrowYourSearch = () => {
  return (
    <>
      <div
        className={`${
          window.innerWidth >= 1024 ? "narrow-sidebar" : "narrow-sidebar-mobile"
        }`}
      >
        <div>
          {window.innerWidth >= 1024 ? (
            <NarrowSearchForm />
          ) : (
            <NarrowSearchFormMobile />
          )}
        </div>
      </div>
    </>
  );
};

export default NarrowYourSearch;
