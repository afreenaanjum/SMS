import React, { Component } from "react";
import { getAuthToken } from "./services/localStorage";
import { Route, Redirect } from "react-router-dom";

class ProtectedRoutes extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { Comp, ...rest } = this.props
        return (
            <Route
                {...rest}
                render={props =>
                    getAuthToken() ? (
                        <Comp {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/",
                                }}
                            />
                        )
                }
            />
        );
    }
}

export default ProtectedRoutes;