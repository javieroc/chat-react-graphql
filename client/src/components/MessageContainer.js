import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './MessageContainer.css';

const NewRoomMessageSubscription = gql`
  subscription($roomId: Int) {
    newRoomMessage(roomId: $roomId) {
      cursor
      node {
        id
        text
        user {
          username
        }
      }
    }
  }
`;

class MessageContainer extends Component {
  constructor(props) {
    super(props);

    this.suscribe = this.suscribe.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = this.suscribe(this.props.messagesQuery.roomId);
  }

  componentWillReceiveProps({ messagesQuery: { roomId } }) {
    if (this.props.messagesQuery.roomId !== roomId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.suscribe(roomId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  suscribe(roomId) {
    this.props.messagesQuery.subscribeToNewRoomMessage(roomId);
  }

  render() {
    const { messages } = this.props.messagesQuery;
    let messagesList = [];
    if (messages) {
      messagesList = messages.edges.map((elem) => {
        const classUser = 'username-chat username-color-cyan';

        const { id, user, text } = elem.node;
        return <p key={id}><span className={classUser}>{user.username}:</span> {text}</p>;
      });
    }
    return (
      <div id="message-container">
        <div id="messages" className="fluorescent-panel scrollbar-magic">
          {messagesList}
        </div>
      </div>
    );
  }
}

const MessagesQuery = gql`
  query Messages($roomId: Int, $first: Int!, $cursor: String) {
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
  props: ({ ownProps: { match }, data: { loading, messages, fetchMore, subscribeToMore } }) => {
    return {
      messagesQuery: {
        loading,
        messages,
        roomId: match.params.roomId,
        loadMoreMessages: () => {
          return fetchMore({
            query: MessagesQuery,
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
        subscribeToNewRoomMessage: (roomId) => {
          return subscribeToMore({
            document: NewRoomMessageSubscription,
            variables: {
              roomId,
            },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.newRoomMessage) {
                return prev;
              }

              const { newRoomMessage } = subscriptionData;

              const newEdges = [newRoomMessage, ...prev.messages.edges];
              const { pageInfo } = prev.messages;
              const { totalCount } = prev.messages;
              const { __typename } = prev.messages;
              return {
                messages: {
                  __typename,
                  totalCount,
                  edges: newEdges,
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

const MessageContainerData = graphql(MessagesQuery, MessagesQueryOptions)(MessageContainer);

export default MessageContainerData;
