import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "../containers/Home/index.js";
import Login from "../containers/Login/index.js";

// This is where you will add the containers aka the web pages.
// You will need to import the page and create an object in the following format
// If a route needs to be exactly defined, use exact: true in the object
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
