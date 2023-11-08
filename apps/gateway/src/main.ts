import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const supergraph = readFileSync(resolve(__dirname, './supergraph.graphql')).toString();

const gateway = new ApolloGateway({
  supergraphSdl: supergraph
});


const server = new ApolloServer({
  gateway,
  cache: new InMemoryLRUCache(),
  persistedQueries: {
    ttl: 60*60*24, // 24h
  },
});



const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.GRAPHQL_GATEWAY_PORT ? parseInt(process.env.GRAPHQL_GATEWAY_PORT) : 4000 },
});

console.info(`🚀  Server ready at: ${url}`);
