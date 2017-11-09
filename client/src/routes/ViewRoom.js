import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Rooms from '../components/Rooms';
import Chat from '../components/Chat';
import Spin from '../components/Spin';
import './ViewRoom.css';

const ViewRoom = (props) => {
  const { loading } = props.roomsQuery;
  return (
    <Spin loading={loading} delay={1000}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Rooms {...props.roomsQuery} />
          </div>
          <div className="col-md-8">
            <Chat {...props.messagesQuery} />
          </div>
        </div>
      </div>
    </Spin>
  );
};

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
`;

const RoomsQueryOptions = {
  options: {
    variables: { first: 15 },
    notifyOnNetworkStatusChange: true,
  },
  props({ data: { loading, rooms, fetchMore } }) {
    return {
      roomsQuery: {
        loading,
        rooms,
        loadMoreRooms: () => {
          return fetchMore({
            query: RoomsQuery,
            variables: {
              first: 3,
              cursor: rooms.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.rooms.edges;
              const { pageInfo } = fetchMoreResult.rooms;
              const { totalCount } = fetchMoreResult.rooms;
              const { __typename } = previousResult.rooms;
              return {
                rooms: {
                  __typename,
                  totalCount,
                  edges: [...previousResult.rooms.edges, ...newEdges],
                  pageInfo,
                },
              };
            },
          });
        },
      },
    };
  },
};

const MessagesQuery = gql`
  query Messages($roomId: Int!, $first: Int!, $cursor: String) {
    messages(roomId: $roomId, first: $first, after: $cursor) {
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
`;

const MessagesQueryOptions = {
  options: ({ match }) => {
    return {
      variables: { roomId: match.params.roomId, first: 10 },
      notifyOnNetworkStatusChange: true,
    };
  },
  props: ({ data: { loading, messages, fetchMore }, match }) => {
    return {
      messagesQuery: {
        loading,
        messages,
        loadMoreMessages: () => {
          return fetchMore({
            query: RoomsQuery,
            variables: {
              roomId: match.params.roomId,
              first: 3,
              cursor: messages.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.messages.edges;
              const { pageInfo } = fetchMoreResult.messages;
              const { totalCount } = fetchMoreResult.messages;
              const { __typename } = previousResult.messages;
              return {
                messages: {
                  __typename,
                  totalCount,
                  edges: [...previousResult.rooms.edges, ...newEdges],
                  pageInfo,
                },
              };
            },
          });
        },
      },
    };
  },
};

const ViewRoomData = compose(
  graphql(RoomsQuery, RoomsQueryOptions),
  graphql(MessagesQuery, MessagesQueryOptions),
)(ViewRoom);

export default ViewRoomData;
