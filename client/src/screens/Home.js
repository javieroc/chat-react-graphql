import React, { Component } from 'react'
import { gql, graphql, compose } from 'react-apollo'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import Spin from '../components/Spin'
import './Home.css'

class Home extends Component {
  render () {
    const { loading, rooms, loadMoreRooms } = this.props.roomsQuery
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

const RoomsQueryOptions = {
  options: {
    variables: { first: 15 },
    notifyOnNetworkStatusChange: true
  },
  props ({ data: { loading, rooms, fetchMore } }) {
    return {
      roomsQuery: {
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
  }
}

const MessagesQuery = gql`
  query Messages($room_id: Int!, $first: Int!, $cursor: String) {
    messages(room_id: $room_id, first: $first, after: $cursor) {
      totalCount
      edges {
        cursor
        node {
          id
          text
          user {
            username
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

const MessagesQueryOptions = {
  options (props) {
    return {
      variables: { room_id: props.room_id, first: 10 },
      notifyOnNetworkStatusChange: true
    }
  },
  props ({ room_id, data: { loading, messages, fetchMore } }) {
    return {
      messagesQuery: {
        loading,
        messages,
        loadMoreMessages: () => {
          return fetchMore({
            query: RoomsQuery,
            variables: {
              room_id: room_id,
              first: 3,
              cursor: messages.pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.messages.edges
              const pageInfo = fetchMoreResult.messages.pageInfo
              const totalCount = fetchMoreResult.messages.totalCount
              const __typename = previousResult.messages.__typename
              return {
                messages: {
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
  }
}

const HomeWithData = compose(
  graphql(RoomsQuery, RoomsQueryOptions),
  graphql(MessagesQuery, MessagesQueryOptions)
)(Home)

export default HomeWithData
