const techResolvers = require('./techResolver');
const projectResolvers = require('./projectResolver');
module.exports = {
    Query:{
        ...techResolvers.Query,
        ...projectResolvers.Query
    },
    Mutation:{
        ...techResolvers.Mutation,
        ...projectResolvers.Mutation
    }
}