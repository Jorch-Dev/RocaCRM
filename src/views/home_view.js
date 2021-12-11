import React, { useEffect } from "react";
import { Navbar_view } from "../components/navbar_component";
import { VerticalBar_component } from "../components/verticalbar_component";
import { Login_view } from "./login_view";
import { Contacts_view } from "./contacts_view";
import { Sales_view } from "./sales_view";
import { EmailViews } from "./email_views";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export const Home_view = () => {
  let authenticated = false;
  const obj = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (obj != null) {
      authenticated = true;
    }
  }, [obj]);

  if (authenticated) {
    return <Redirect replace to="/" />;
  }
  return (
    <div className="h-100">
      <Router>
        <div>
          <Navbar_view />
        </div>

        <div className="d-flex h-100">
          <VerticalBar_component />
          <div className="w-100">
            <Switch>
              <Route exact path="/" component={Login_view} />
              <Route exact path="/home" component={EmailViews} />
              <Route exact path="/contacts_view" component={Contacts_view} />
              <Route exact path="/sales_view" component={Sales_view} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};
