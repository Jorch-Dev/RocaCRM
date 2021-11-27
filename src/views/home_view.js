import React from "react";
import { Navbar_view } from "../components/navbar_component";
import { VerticalBar_component } from "../components/verticalbar_component";
import { Contacts_view } from "../views/contacts_view";
import { Sales_view } from "../views/sales_view";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const Home_view = () => {
  return (
    <>
        <div className="w-100">
          <Navbar_view />
        </div>
        <Router>
        <div className="container-fluid d-flex h-100 p-0">
          <div>
            <VerticalBar_component />
          </div>

          <div className="col">
            <Switch>
              <Route exact path="/home" component={Contacts_view} />
              <Route exact path="/contacts_view" component={Contacts_view} />
              <Route exact path="/sales_view" component={Sales_view} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};
