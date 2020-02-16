import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// This is where you will add the containers aka the web pages.
// You will need to import the page and create an object in the following format
export const routes = [
  {
    name: "Index",
    path: "/",
    component: null // Leave this null for now, will be updated to contain background and layout components
  },
  {
    name: "Home",
    path: "/home",
    component: (
      <div style={{ backgroundColor: "blue" }}>
        <h1>Home</h1>
      </div>
    )
  },
  {
    name: "About",
    path: "/about",
    component: (
      <div>
        <h1>About</h1>
      </div>
    )
  },
  {
    name: "Apply",
    path: "/apply",
    component: (
      <div>
        <h1>Apply Today!</h1>
      </div>
    )
  }
];

export const Routing = () => {
  return (
    <Router>
      <Switch>
        <div>
          {routes.map(route => (
            <Route key={route.name} path={route.path}>
              {route.component}
            </Route>
          ))}
        </div>
      </Switch>
    </Router>
  );
};
