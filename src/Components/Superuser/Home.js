import React from "react";
import Navigation from "../Navigation/Navigation";
import { Container } from "react-bootstrap";
import { SuperuserRoute } from "../../Pages/router";
import { Switch, useRouteMatch } from "react-router-dom";
import { useSuperuserContext } from "../../superuser";
import SuperuserTable from "./Table";

const SuperuserHome = () => {
    document.title = "Superuser - Home";
  
    let { path } = useRouteMatch();
    const { users } = useSuperuserContext();
  
    return (
      <Switch>
        <SuperuserRoute exact path={path}>
          <>
            <div>
              <Navigation />
            </div>
            <SuperuserTable users={users} />
          </>
        </SuperuserRoute>
        {/* <SuperuserRoute exact path={`${path}/:id`}>
          <TruckDetails />
        </SuperuserRoute>
        <SuperuserRoute exact path={`${path}/edit/:id`}>
          <UpdateTruckDetails />
        </SuperuserRoute>
        <SuperuserRoute exact path={`${path}/edit/notes/:id`}>
          <UpdateNotes />
        </SuperuserRoute> */}
      </Switch>
    );
  };
  export default SuperuserHome;