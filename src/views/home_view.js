import React from "react";
import { Navbar_view } from "../components/navbar_component";
import { VerticalBar_component } from "../components/verticalbar_component";
import { Contacts_view } from "./contacts_view";
import { Sales_view } from "./sales_view";
import { EmailMarketingView } from "./emailmarketing_view"
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

export const HomeView = () => {
  const { path, url } = useRouteMatch();

  return (
    <div className="d-flex h-100">

      <div className="d-block">
        <VerticalBar_component />
      </div>
      
      <div className="col bg-gray-00 h-100 overflow-auto">
        <Navbar_view />
        <Switch>
          <Route exact path={`${path}`}>
            <Contacts_view />
          </Route>
          <Route exact path={`${path}/home`}>
            <Contacts_view />
          </Route>
          <Route exact path={`${path}/sales`}>
            <Sales_view />
          </Route>
          <Route exact path={`${path}/EmailMarketing`}>
            <EmailMarketingView /> 
          </Route>
          {/* <Route exact path="/contacts" component={Contacts_view} />
          <Route exact path="/contacts" component={Contacts_view} />
          <Route exact path="/sales" component={Sales_view} /> */}
        </Switch>
      </div>

    </div>
  );
};
