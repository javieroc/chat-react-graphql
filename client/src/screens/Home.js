import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import './Home.css'

class Home extends Component {
  render () {
    const { loading, rooms, loadMoreRooms } = this.props

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div id='rooms-sidebar'>
              <Rooms rooms={rooms} loadMoreRooms={loadMoreRooms} />
            </div>
          </div>
          <div className='col-md-8'>
            <Chat />
          </div>
        </div>
      </div>
    )
  }
}

const RoomsQuery = gql`
  query Rooms($cursor: String) {
    rooms(first: 10, after: $cursor) {
      totalCount
      edges {
        cursor
        node {
          id
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

const HomeWithData = graphql(RoomsQuery, {
  props ({ data: { loading, rooms, fetchMore } }) {
    return {
      loading,
      rooms,
      loadMoreRooms: () => {
        return fetchMore({
          query: RoomsQuery,
          variables: {
            cursor: rooms.pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.rooms.edges
            const pageInfo = fetchMoreResult.rooms.pageInfo
            const totalCount = fetchMoreResult.rooms.totalCount
            const __typename = previousResult.rooms.__typename
            console.log('total count', totalCount)
            return {
              rooms: {
                __typename,
                totalCount,
                edges: [...previousResult.rooms.edges, ...newEdges],
                pageInfo
              }
            }
          }
        })
      }
    }
  }
})(Home)

export default HomeWithData
