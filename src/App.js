import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login_view } from "./views/login_view"
import { Home_view } from "./views/home_view"
import { PrivateRoute } from "./components/privateroute_component"
import "./styles/App.css";

function App() {
  return (
    <Fragment>
      <Router>
        
        <Switch>
          <Route exact path="/" component={Login_view} />

          <PrivateRoute exact path="/home" component={Home_view} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
