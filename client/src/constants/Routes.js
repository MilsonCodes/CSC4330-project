import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Error, Home, Login, Register, Profile, CompanyProfile, Listing, ListingApps, UserApplications, Search, Stakeholders, Settings, Admin, Test } from '../containers/index'
import { connect } from "react-redux";
import { history } from '../helpers/history'
import { logoutUser } from "../redux/auth/actions";

/* Logout Component */
const LogoutComp = props => {
  const { loggedIn, dispatch } = props

  if(!loggedIn)
    history.push("/login")
  else
    dispatch(logoutUser())

  return (
    <>
      <h1 className="ml-auto mr-auto"> Logging out...</h1>
    </>
  )
}

const Logout = connect(state => {
  const { loggedIn } = state.auth
  return { loggedIn } 
})(LogoutComp)

// This is where you will add the containers aka the web pages.
// You will need to import the page and create an object in the following format
// If a route needs to be exactly defined, use exact: true in the object
// This object set can likely be simplified in the future, but for now we'll run with this
// For now, all routes will be available until we make our authentication system (so we can view what each page looks like)
const routes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home
  },
  {
    name: "Home",
    path: "/home",
    component: () => (
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
    name: "Logout",
    path:"/logout",
    auth: true,
    component: Logout
  },
  {
    name: "Profile",
    path: "/profile",
    exact: true,
    auth: true,
    component: Profile
  },
  {
    name: "Profile",
    path: "/profile/:id",                         //Access the id in Profile with props.match.params.id -- This applies to all paths with parameters
    auth: true,
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
    auth: true,
    component: CompanyProfile
  },
  {
    name: "Job Listing",
    path: "/listing/:id",                         //Access the id in Listing with props.match.params.id -- This applies to all paths with parameters
    auth: true,
    exact: true,
    component: Listing
  },
  {
    name: "Job Listing Applications",
    path: "/listing/:id/applications",             //Access the id in ListingApps with props.match.params.id -- This applies to all paths with parameters
    auth: true,
    component: ListingApps
  },
  {
    name: "User Applications",
    path: "/applications",
    auth: true,
    component: UserApplications
  },
  {
    name: "Job Search",
    path: "/search",
    auth: true,
    component: Search
  },
  {
    name: "Stakeholders",
    path: "/stakeholders",
    auth: true,
    component: Stakeholders
  },
  {
    name: "Settings",
    path: "/settings",
    auth: true,
    component: Settings
  },
  {
    name: "Admin",
    path: "/admin",
    auth: true,
    component: Admin
  },
  {
    name: "Test",
    path: "/test",
    auth: false,
    component: Test
  },
  {
    name: "Error",
    path: "**",
    component: Error
  }
];

class AuthRoute extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { component: Component, loggedIn, ...rest } = this.props;

    return(
      <Route {...rest} render={props => (
        loggedIn ?
          <Component {...props} />
        :
          <Redirect to='/login' />
      )} />
    )
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.auth
  return { loggedIn }
}

const PrivateRoute = connect(mapStateToProps)(AuthRoute);

// Used as part of React Router to initialize correct routes in the site.
// This function uses the routes above to map out the correct component based on route.
export const Routing = () => {
  return (
    <Router history={history}>
      <Switch>
        {routes.map(route => (
          !route.auth ?
            <Route key={route.name} exact={route.exact} path={route.path} component={route.component} />
          :
            <PrivateRoute key={route.name} exact={route.exact} path={route.path} component={route.component} />
        ))}
      </Switch>
    </Router>
  );
};
