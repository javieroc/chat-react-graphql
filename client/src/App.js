import React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import firebase from 'firebase';
import Routes from './routes';
import './App.css';

const config = {
  apiKey: 'AIzaSyDuX-5ZIA8Bu_vtND1XazSVRf1FYs_yMy8',
  authDomain: 'chat-react-graphql.firebaseapp.com',
  databaseURL: 'https://chat-react-graphql.firebaseio.com',
  projectId: 'chat-react-graphql',
  storageBucket: 'chat-react-graphql.appspot.com',
};

firebase.initializeApp(config);

const httpLink = createHttpLink({ uri: '/api/graphql' });

const authMiddleware = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token') || null,
    'x-refresh-token': localStorage.getItem('refreshToken') || null,
  },
}));

const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    return response;
  });
});

const client = new ApolloClient({
  link: authAfterware.concat(authMiddleware.concat(httpLink)),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
