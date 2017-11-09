import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ViewRoom from './ViewRoom';
import Login from './Login';
import Nav from '../components/Nav';

const Routes = () => (
  <Router>
    <div>
      <Nav />
      <br />
      <Route exact path="/" component={Login} />
      <Route path="/rooms/:roomId" component={ViewRoom} />
    </div>
  </Router>
);

export default Routes;
