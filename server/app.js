import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';
import schema from './schema';
import utils from './utils';

const app = express();

app.use(cors('*'));

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const user = await utils.verifyUser(token);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await utils.refreshTokens(refreshToken);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const buildOptions = async (req) => {
  return {
    context: { user: req.user },
    schema,
    formatError: (error) => {
      return error.originalError;
    },
  };
};

app.use(
  '/api/graphql',
  bodyParser.json(),
  graphqlExpress(buildOptions),
);

app.use(
  '/graphiql',
  graphiqlExpress({ endpointURL: '/api/graphql' }),
);

export default app;
