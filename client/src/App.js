import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Nav from './components/Nav';

const client = new ApolloClient({
  link: createHttpLink({ uri: '/api/graphql' }),
  cache: new InMemoryCache(),
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
