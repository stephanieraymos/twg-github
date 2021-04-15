import { loginPATH, dashboardPATH } from "./paths";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { useAuthContext } from "../auth";


export const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuthContext();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
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
    const { isAuthenticated, isSuperuser } = useAuthContext();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() && isSuperuser() ? (
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
    const { isAuthenticated } = useAuthContext();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
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