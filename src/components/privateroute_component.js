import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  let authenticated = false;
  let tken = JSON.parse(localStorage.getItem("token"));

  if (tken != null) {
    authenticated = true;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => 
        tken !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )}
    />

    // <Route exact={props.exact} path={props.path}>
    //   {authenticated ? <Component /> : <Redirect to="/" />}
    // </Route>
  );
};
