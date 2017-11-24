import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';

const app = express();

app.use(
  '/api/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    formatError: (error) => {
      return error.originalError;
    },
  }),
);

app.use(
  '/graphiql',
  graphiqlExpress({ endpointURL: '/api/graphql' }),
);

export default app;
