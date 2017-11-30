import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({ uri: '/api/graphql' });

const authMiddleware = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token') || null,
    'x-refresh-token': localStorage.getItem('refreshToken') || null,
  },
}));

const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    return response;
  });
});

const linkWithMiddlewareAndAfterware = authAfterware.concat(authMiddleware.concat(httpLink));

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3001/subscriptions',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  linkWithMiddlewareAndAfterware,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
