const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const moviesSchema = require("./schemas/moviesSchema");
const seriesSchema = require("./schemas/seriesSchema");

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, moviesSchema.typeDefs, seriesSchema.typeDefs],
  resolvers: [moviesSchema.resolvers, seriesSchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen(1000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});