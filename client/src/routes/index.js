import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ViewRoom from './ViewRoom';
import Login from './Login';
import Register from './Register';
import Nav from '../components/Nav';
import { isAuthenticated } from '../services';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    )
  )}
  />
);

const Routes = () => (
  <Router>
    <div>
      <Nav />
      <br />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/:roomId?" component={ViewRoom} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
