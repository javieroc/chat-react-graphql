import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'

class Home extends Component {
  render () {
    const { data } = this.props

    if (data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <Rooms rooms={data.rooms} />
          </div>
          <div className='col-md-8'>
            <Chat />
          </div>
        </div>
      </div>
    )
  }
}

const query = gql`
  query getRooms{
    rooms {
      id
      name
    }
  }
`

export default graphql(query)(Home)
