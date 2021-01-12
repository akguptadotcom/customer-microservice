const express = require("express")
const { ApolloServer } = require('apollo-server-express')
const { applyMiddleware } = require("graphql-middleware");

//const resolvers = require("./resolver/index");
const resolverss = require("./resolver")
const mutations = require("./mutations");
const typeDefs = require("./schema");
const app = express();

const resolvers = {
    Query: {...resolverss},
    Mutation:{...mutations}
};


const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app , path: "/", cors: true});

const port = 4008;
app.listen({ port }, () =>
console.log(`Server ready at http://localhost:${port}`)
);

