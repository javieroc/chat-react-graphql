const { merge } = require('lodash')
const userResolvers = require('./User')
const roomResolvers = require('./Room')
const messageResolvers = require('./Message')

const resolvers = merge(userResolvers, roomResolvers, messageResolvers)

module.exports = resolvers
