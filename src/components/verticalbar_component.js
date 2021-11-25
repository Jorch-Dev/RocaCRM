import React, { Fragment } from "react";
import { IoMdContacts } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Contacts_view } from "../views/contacts_view";
import { Sales_view } from "../views/sales_view";

export const VerticalBar_component = () => {

  return (
    <Fragment>
      <Router>
        <div className="container_vertical shadow-sm">
          <div className="options_vertical">
            <Link to="/contacts_view">
              <div
                className="option_vertical"
              >
                <IoMdContacts size="50" className="img-fluid" />
                <p>Contactos</p>
              </div>
            </Link>

            <Link to="/sales_view">
              <div
                className="option_vertical"
              >
                <BsCashStack size="50" className="img-fluid" />
                <p>Mis ventas</p>
              </div>
            </Link>
          </div>
        </div>

        <Switch>
        <Route exact path="/home" component={Contacts_view} />

          <Route exact path="/contacts_view" component={Contacts_view} />

          <Route exact path="/sales_view" component={Sales_view} />
        </Switch>
      </Router>
    </Fragment>
  );
};
