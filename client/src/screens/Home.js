import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import Spin from '../components/Spin'
import './Home.css'

class Home extends Component {
  render () {
    const { loading, rooms, loadMoreRooms } = this.props
    return (
      <Spin loading={loading} delay={1000}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <Rooms rooms={rooms} loadMoreRooms={loadMoreRooms} loading={loading} />
            </div>
            <div className='col-md-8'>
              <Chat />
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}

const RoomsQuery = gql`
  query Rooms($first: Int!, $cursor: String) {
    rooms(first: $first, after: $cursor) {
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
  options: {
    variables: { first: 10 },
    notifyOnNetworkStatusChange: true
  },
  props ({ data: { loading, rooms, fetchMore } }) {
    return {
      loading,
      rooms,
      loadMoreRooms: () => {
        return fetchMore({
          query: RoomsQuery,
          variables: {
            first: 3,
            cursor: rooms.pageInfo.endCursor
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.rooms.edges
            const pageInfo = fetchMoreResult.rooms.pageInfo
            const totalCount = fetchMoreResult.rooms.totalCount
            const __typename = previousResult.rooms.__typename
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
