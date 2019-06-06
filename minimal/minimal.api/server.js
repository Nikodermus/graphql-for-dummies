const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const PORT = 9000;
const app = express();
const graphqlEndpoint = "/graphql";

const typeDefs = `
    type Query {
        greeting: String
    }
`;

const resolvers = {
  Query: {
    greeting: () => "Moshi Moshi App Desu"
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), bodyParser.json());
app.use(graphqlEndpoint, graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: graphqlEndpoint }));

app.listen(PORT);
