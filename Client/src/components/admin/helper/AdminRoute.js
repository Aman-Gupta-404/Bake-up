import React from "react";
import { Route, Redirect } from "react-router";
import { isAdmin } from "./authHelper";
import { isAuthenticated } from "./authHelper";

function AdminRoute({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          const admin = isAdmin() && isAuthenticated();
          if (admin) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                exact
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
}

export default AdminRoute;
