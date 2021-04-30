import React from "react";
import { Nav, Card } from "react-bootstrap";
import NarrowSearchForm from "./NarrowSearchForm";
import { InventoryProvider } from "../../../inventory";

const NarrowYourSearch = () => {
  return (
    <>
      <InventoryProvider>
        <div
          className={`${
            window.innerWidth >= 1024
              ? "narrow-sidebar"
              : "narrow-sidebar-mobile"
          }`}
        >
          <div>
           
              <NarrowSearchForm />

          </div>
        </div>
      </InventoryProvider>
    </>
  );
};

export default NarrowYourSearch;
