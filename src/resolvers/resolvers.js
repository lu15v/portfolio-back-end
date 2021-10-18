const techResolvers = require('./techResolver');

module.exports = {
    Query:{
        ...techResolvers.Query
    },
    Mutation:{
        ...techResolvers.Mutation,
    }
}