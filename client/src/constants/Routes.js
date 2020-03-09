import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Error from "../containers/Error/index.js";
import Home from "../containers/Home/index.js";
import Login from "../containers/Login/index.js";
import Register from "../containers/Register/index.js";
import Profile from "../containers/Profile/index.js";
import CompanyProfile from "../containers/Company/index.js";
import Listing from "../containers/Listing/index.js";
import ListingApps from "../containers/ListingApps/index.js";
import UserApplications from "../containers/Applications/index.js";
import Search from "../containers/Search/index.js";
import Stakeholders from "../containers/Stakeholders/index.js";
import Settings from "../containers/Settings/index.js";
import Admin from "../containers/Admin/index.js";

// This is where you will add the containers aka the web pages.
// You will need to import the page and create an object in the following format
// If a route needs to be exactly defined, use exact: true in the object
// This object set can likely be simplified in the future, but for now we'll run with this
// For now, all routes will be available until we make our authentication system (so we can view what each page looks like)
export const routes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home
  },
  {
    name: "Home",
    path: "/home",
    component: (
      <Redirect to="/" />
    )
  },
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    name: "Register",
    path: "/register",
    component: Register
  },
  {
    name: "Profile",
    path: "/profile",
    exact: true,
    component: Profile
  },
  {
    name: "Profile",
    path: "/profile/:id",                         //Access the id in Profile with props.match.params.id -- This applies to all paths with parameters
    component: Profile
  },
  {
    name: "Company Profile",
    path: "/company",
    exact: true,
    component: CompanyProfile
  },
  {
    name: "Company Profile",
    path: "/company/:id",                         //Access the id in CompanyProfile with props.match.params.id -- This applies to all paths with parameters
    component: CompanyProfile
  },
  {
    name: "Job Listing",
    path: "/listing/:id",                         //Access the id in Listing with props.match.params.id -- This applies to all paths with parameters
    exact: true,
    component: Listing
  },
  {
    name: "Job Listing Applications",
    path: "/listing/:id/applications",             //Access the id in ListingApps with props.match.params.id -- This applies to all paths with parameters
    component: ListingApps
  },
  {
    name: "User Applications",
    path: "/applications",
    component: UserApplications
  },
  {
    name: "Job Search",
    path: "/search",
    component: Search
  },
  {
    name: "Stakeholders",
    path: "/stakeholders",
    component: Stakeholders
  },
  {
    name: "Settings",
    path: "/settings",
    component: Settings
  },
  {
    name: "Admin",
    path: "/admin",
    component: Admin
  },
  {
    name: "404",
    path: "**",
    component: Error
  }
];

// Used as part of React Router to initialize correct routes in the site.
// This function uses the routes above to map out the correct component based on route.
export const Routing = () => {
  return (
    <Router>
      <Switch>
        {routes.map(route => (
          <Route key={route.name} exact={route.exact} path={route.path}>
            {route.component}
          </Route>
        ))}
      </Switch>
    </Router>
  );
};
