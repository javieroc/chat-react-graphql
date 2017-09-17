import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './screens/Home'
import Login from './screens/Login'
import Nav from './components/Nav'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    )
  }
}

export default App
