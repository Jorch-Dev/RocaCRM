import React, { useContext, useEffect } from "react";
import { Navbar_view } from "../components/navbar_component";
import { VerticalBar_component } from "../components/verticalbar_component";
import { UserContext } from "../context/user_context";
import { Contacts_view } from "./contacts_view";
import { Sales_view } from "./sales_view";
import { EmailViews } from "./email_views"
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

export const Home_view = () => {
  let history = useHistory();
  const { path, url } = useRouteMatch();
  let authenticated = false;
  const obj = JSON.parse(localStorage.getItem("token"));
  const { userState, setUserState } = useContext(UserContext);

  useEffect(() => {
    //-----Si el usuario tiene el plan con Id 1 entonces no lo dejamos entrar, descomentar el if
    if (userState.usuario !== null) {
      if (userState.usuario.Pln_ID === 1) {
        history.replace("/");
      }
    }
    if (obj != null) {
      authenticated = true;
    }
  }, [userState.usuario, obj]);

  if (authenticated) {
    return <Redirect replace to="/" />;
  }
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
          <Route exact path={`${path}/marketing`}>
            <EmailViews />
          </Route>
          {/* <Route exact path="/contacts" component={Contacts_view} />
          <Route exact path="/contacts" component={Contacts_view} />
          <Route exact path="/sales" component={Sales_view} /> */}
        </Switch>
      </div>

    </div>
  );
};
