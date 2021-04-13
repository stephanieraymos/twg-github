import { loginPATH, dashboardPATH } from "./paths";
import {
    Route,
    Redirect,
} from "react-router-dom";
import { useAuthContext } from "../auth";


const PrivateRoute = ({ children, ...rest }) => {
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

const LoginRoute = ({ children, ...rest }) => {
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

export { PrivateRoute, LoginRoute };