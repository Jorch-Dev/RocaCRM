import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login_view } from "./views/login_view";
import { Home_view } from "./views/home_view";
import { RegisterView } from "./views/register_view"
import { ResetPasswordView } from "./views/resetpassword_view"
import { PrivateRoute } from "./components/privateroute_component";
import { User_ContextProvider } from "./context/user_context";
import "./styles/App.css";

function App() {
  return (
    <User_ContextProvider>
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Login_view} />
            <Route exact path="/register" component={RegisterView} />
            <Route exact path="/reset" component={ResetPasswordView} />
            <PrivateRoute path="/home" component={Home_view} />
          </Switch>
        </Router>
      </>
    </User_ContextProvider>
  );
}

export default App;
