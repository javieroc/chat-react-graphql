import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ViewRoom from './ViewRoom';
import Login from './Login';
import Register from './Register';
import Nav from '../components/Nav';
import Home from './Home';

const Routes = () => (
  <Router>
    <div>
      <Nav />
      <br />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/rooms/:roomId?" component={ViewRoom} />
    </div>
  </Router>
);

export default Routes;
