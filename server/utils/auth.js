import jwt from 'jsonwebtoken';
import _ from 'lodash';
import config from '../config';

const createTokens = (user) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id']),
    },
    config.SECRET,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    config.SECRET2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

export {
  createTokens,
};
