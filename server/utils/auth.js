import jwt from 'jsonwebtoken';
import _ from 'lodash';
import config from '../config';
import { user } from '../db/models';

const createTokens = (userRow) => {
  const createToken = jwt.sign(
    {
      user: _.pick(userRow, ['id']),
    },
    config.SECRET,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(userRow, ['id']),
    },
    config.SECRET2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

const refreshTokens = async (refreshToken) => {
  let userId = 0;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const userRow = await user.findOne({ where: { id: userId }, raw: true });

  if (!userRow) {
    return {};
  }

  try {
    jwt.verify(refreshToken, config.SECRET2);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(userRow);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user: userRow,
  };
};

const verifyUser = async (token) => {
  try {
    const tokenVerified = await jwt.verify(token, config.SECRET);
    const userRow = await user.findOne({ where: { id: tokenVerified.user.id }, raw: true });

    return userRow;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

export {
  createTokens,
  refreshTokens,
  verifyUser,
};
