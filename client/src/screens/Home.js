import React, { Component } from 'react'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'

class Home extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Rooms />
          </div>
          <div className="col-md-8">
            <Chat />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
