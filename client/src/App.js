import React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
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

const client = new ApolloClient({
  link: createHttpLink({ uri: '/api/graphql' }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
