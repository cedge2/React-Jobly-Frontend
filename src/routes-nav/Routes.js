import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Routes.css";

// import components
import Home from "../home/Home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import ProfileForm from "../profile/ProfileForm";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Some of the site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route results in a friendly message asking user to click one of the links in the navBar
 */

function Routes({ signup, login }) {
  return (
    <div className="Routes">
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>

        <PrivateRoute path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <Route>
          <div>
            <p className="errorHandler1">
              This page cannot be found...
            </p>
            <p className="errorHandler2">
              Please click one of the links to redirect.
            </p>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
export default Routes;