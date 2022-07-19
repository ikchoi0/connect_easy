import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import RegisterPage from "./HomePage/AuthPages/RegisterPage/RegisterPage";
import LoginPage from "./HomePage/AuthPages/LoginPage/LoginPage";
import Category from "./Category/Category";
import Dashboard from "./Dashboard/Dashboard";
import ClientDashboard from "./ClientDashboard/ClientDashboard";
import ConsultantDashboard from "./ConsultantDashboard/ConsultantDashboard";
import { AlertNotification } from "./shared/components/AlertNotification";
import ResetPasswordPage from "./HomePage/AuthPages/ResetPasswordPage/ResetPasswordPage";
import GetEmailPage from "./HomePage/AuthPages/GetEmailPage/GetEmailPage";

/**
 *
 * https://reacttraining.com/blog/react-router-v5-1/
 * shows how to use the params in the url
 */

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/password">
            <GetEmailPage />
          </Route>
          <Route exact path="/password/:email/:token">
            <ResetPasswordPage />
          </Route>
          <Route exact path="/category">
            <Category />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/consultantDashboard">
            <ConsultantDashboard />
          </Route>
          <Route path="/clientDashboard">
            <ClientDashboard />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
        <AlertNotification />
      </Router>
    </>
  );
}

export default App;
