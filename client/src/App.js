import React, { Component } from 'react'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Nav from './components/Nav'

const networkInterface = createNetworkInterface({
  uri: '/api/graphql'
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Nav />
            <br />
            <Route exact path='/' render={(props) => (<Home {...props} room_id={2} />)} />
            <Route path='/login' component={Login} />
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
