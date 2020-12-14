import React from "react";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import store from "../../../redux/store";
import { isAuthenticated } from "./authHelper";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const auth = isAuthenticated();
        if (auth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              exact
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        // return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
