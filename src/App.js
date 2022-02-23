import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginView } from "./views/login_view";
import { HomeView } from "./views/home_view";
import { ResetPasswordView } from "./views/resetpassword_view";
import { NotificationComponent } from "./components/notification_component";
import { PrivateRoute } from "./components/privateroute_component";
import { User_ContextProvider } from "./context/user_context";
import { NotificacionContextProvider } from "./context/notification_context"
import { MarketingContextProvider } from "./context/emailmarketing_context";
import "./styles/App.css";

function App() {
  return (
      <Router>
        <User_ContextProvider>
          <NotificacionContextProvider>
            <NotificationComponent />
              <Switch>
                <Route exact path="/" component={LoginView} />
                <Route exact path="/reset" component={ResetPasswordView} />
                <PrivateRoute path="/home">
                  <MarketingContextProvider>
                    <HomeView />
                  </MarketingContextProvider>
                </PrivateRoute>
              </Switch>
          </NotificacionContextProvider> 
        </User_ContextProvider>
      </Router>
  );
}

export default App;
