import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './MessageContainer.css';

class MessageContainer extends Component {
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
  props: ({ ownProps: { match }, data: { loading, messages, fetchMore } }) => {
    return {
      messagesQuery: {
        loading,
        messages,
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
      },
    };
  },
};

const MessageContainerData = graphql(MessagesQuery, MessagesQueryOptions)(MessageContainer);

export default MessageContainerData;
