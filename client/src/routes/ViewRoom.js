import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import Rooms from '../components/Rooms';
import MessageContainer from '../components/MessageContainer';
import SendMessage from '../components/SendMessage';
import Spin from '../components/Spin';
import './ViewRoom.css';

const ViewRoom = (props) => {
  const { loading, rooms } = props.roomsQuery;

  if (!loading) {
    const firstRoomId = rooms.edges[0].node.id;
    const roomId = props.match.params.roomId || firstRoomId;
    const room = rooms.edges.find(elem => elem.node.id === roomId);
    if (!room) {
      return <Redirect to={`/${firstRoomId}`} />;
    }
  }

  return (
    <Spin loading={loading} delay={1000}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Rooms {...props.roomsQuery} />
          </div>
          <div className="col-md-8">
            <MessageContainer {...props} />
            <SendMessage {...props} />
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
  props({ ownProps: { match }, data: { loading, rooms, fetchMore } }) {
    return {
      roomsQuery: {
        loading,
        rooms,
        roomId: match.params.roomId,
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

const ViewRoomData = graphql(RoomsQuery, RoomsQueryOptions)(ViewRoom);

export default ViewRoomData;
