import React from "react";
import Navigation from "../Navigation/Navigation";
import { PrivateRoute } from "../../Pages/router";
import { Switch, useRouteMatch } from "react-router-dom";

import BuyerDashboard from "./BuyerDashboard";
import { InventoryProvider } from "../../inventory";
import { authService } from "../../authService";

const Dashboard = () => {
    document.title = "Dashboard";

    let { path } = useRouteMatch();

    const { is_seller, is_admin } = authService.getUser();

    return (
        <Switch>
            <InventoryProvider>
                <PrivateRoute exact path={path}>
                    <>
                        <div>
                            <Navigation />
                        </div>
                        {is_admin ? (
                            <BuyerDashboard />
                        ) : is_seller ? (
                            <BuyerDashboard />
                        ) : (
                            <BuyerDashboard />
                        )}
                    </>
                </PrivateRoute>
            </InventoryProvider>
        </Switch>
    );
};
export default Dashboard;
