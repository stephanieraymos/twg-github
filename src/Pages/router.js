import { loginPATH, dashboardPATH } from "./paths";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { authService } from "../authService";

export const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authService.getIsAuth() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: loginPATH,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export const SuperuserRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authService.getIsAuth() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: dashboardPATH,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export const LoginRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authService.getIsAuth() ? (
                    <Redirect
                        to={{
                            pathname: dashboardPATH,
                            state: { from: location }
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
}