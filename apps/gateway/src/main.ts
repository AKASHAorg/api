import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
//
//
// const gateway = new ApolloGateway({
//   supergraphSdl: new IntrospectAndCompose({
//     subgraphs: [
//       { name: 'ceramic', url: 'http://localhost:5001/graphql' },
//     ],
//   }),
// });

// example
const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This "Book" type defines the queryable fields for every book in our data source.
type Book {
  title: String
  author: String
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
  books: [Book]
}
`;
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});



const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.info(`🚀  Server ready at: ${url}`);
