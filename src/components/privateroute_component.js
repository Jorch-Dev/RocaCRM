import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...props }) => {
  let authenticated = false
  const obj = JSON.parse(localStorage.getItem("token"));
  
  if (obj != null) {
    authenticated = true;
 }

  return (
    <Route exact={props.exact} path={props.path}>
      {authenticated ? <Component /> : <Redirect to="/" />}
    </Route>
  );
};
