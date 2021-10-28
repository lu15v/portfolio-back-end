
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/resolvers');
const express = require('express');

const __PORT__ = 5000;

const server = new GraphQLServer({
    typeDefs,
    resolvers //the 3rd argument is the context
});


server.express.use('/images', express.static('images'));

mongoose
.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    return server.start({port: process.env.PORT || __PORT__})
})
.then(res => {
        const {port} = res.address();
        console.log(`Server running ${port}`)
});