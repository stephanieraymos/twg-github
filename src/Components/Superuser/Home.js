import React from "react";
import Navigation from "../Navigation/Navigation";
import { Container } from "react-bootstrap";
import { SuperuserRoute } from "../../Pages/router";
import { Switch, useRouteMatch } from "react-router-dom";
import SuperuserTable from "./Table";
import SuperuserDetails from "./Details";

const SuperuserHome = () => {
    document.title = "Superuser - Home";
  
    let { path } = useRouteMatch();
  
    return (
      <Switch>
        <SuperuserRoute exact path={path}>
          <>
            <div>
              <Navigation />
            </div>
            <SuperuserTable />
          </>
        </SuperuserRoute>
        <SuperuserRoute path={`${path}/:id`}>
          <SuperuserDetails />
        </SuperuserRoute>
        {/* <SuperuserRoute exact path={`${path}/edit/:id`}>
          <UpdateTruckDetails />
        </SuperuserRoute> */}
      </Switch>
    );
  };
  export default SuperuserHome;