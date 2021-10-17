
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const {MONGODB} =require('../config');

const __PORT__ = 5000;
const typeDefs = `
    type Query{
        sayHi: String!
    }
`
const resolvers = {
    Query:{
        sayHi:  () => 'Hello World'
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers //the 3rd argument is the context
});

mongoose
.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    return server.start({port: __PORT__})
})
.then(res => {
        const {port} = res.address();
        console.log(`Server running ${port}`)
});