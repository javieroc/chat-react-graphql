import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Nav from './components/Nav';

const networkInterface = createNetworkInterface({
  uri: '/api/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Nav />
            <br />
            <Route exact path="/" component={Login} />
            <Route path="/rooms/:roomId" component={Home} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
