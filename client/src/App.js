import React from 'react';
import { ApolloProvider } from 'react-apollo';
import firebase from 'firebase';
import client from './Apollo';
import Routes from './routes';
import './App.css';

// Firebase
const config = {
  apiKey: 'AIzaSyDuX-5ZIA8Bu_vtND1XazSVRf1FYs_yMy8',
  authDomain: 'chat-react-graphql.firebaseapp.com',
  databaseURL: 'https://chat-react-graphql.firebaseio.com',
  projectId: 'chat-react-graphql',
  storageBucket: 'chat-react-graphql.appspot.com',
};

firebase.initializeApp(config);

// App
const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
