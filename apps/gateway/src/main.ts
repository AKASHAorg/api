import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from "@apollo/gateway";
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { InMemoryLRUCache, PrefixingKeyValueCache } from '@apollo/utils.keyvaluecache';
import { ComposeDBDataSource } from "./headers.propagate.js";
import { VIEWER_ID_HEADER } from '@composedb/constants';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const supergraph = readFileSync(resolve(__dirname, './supergraph.graphql')).toString();

const gateway = new ApolloGateway({
  supergraphSdl: supergraph,
  buildService({ name, url }) {
    return new ComposeDBDataSource({ url });
  }
});

const cache = new InMemoryLRUCache({
    maxSize: Math.pow(2, 20) * 128, // ~128 MiB
  });

const server = new ApolloServer({
  gateway,
  cache: new PrefixingKeyValueCache(cache, "gql:"),
  persistedQueries: {
    ttl: 60*60*24, // 24h
  },
});



const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.GRAPHQL_GATEWAY_PORT ? parseInt(process.env.GRAPHQL_GATEWAY_PORT) : 4000 },
  context: async ({ req }) => {
    return { viewerID: req.headers[VIEWER_ID_HEADER] || req.headers[VIEWER_ID_HEADER.toLowerCase()] }
  }
});

console.info(`🚀  Server ready at: ${url}`);
