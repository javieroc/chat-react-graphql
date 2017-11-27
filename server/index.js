import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import schema from './schema';
import config from './config';
import app from './app';

const server = createServer(app);
const { port } = config;

server.listen(port, () => {
  // eslint-disable-next-line no-new
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server,
    path: '/subscriptions',
  });
  console.log(`Server running on http://localhost:${port}`);
});
