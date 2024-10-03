import { ApolloServer, PersistedQueryOptions } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from "@apollo/gateway";
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { InMemoryLRUCache, PrefixingKeyValueCache } from '@apollo/utils.keyvaluecache';
import { KeyvAdapter } from "@apollo/utils.keyvadapter";
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

import { ComposeDBDataSource } from "./headers.propagate.js";
import { VIEWER_ID_HEADER } from '@composedb/constants';
import * as process from "process";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const supergraph = readFileSync(resolve(__dirname, './supergraph.graphql')).toString();

const gateway = new ApolloGateway({
  supergraphSdl: supergraph,
  buildService({ name, url }) {
    return new ComposeDBDataSource({ url });
  }
});

let cache: PersistedQueryOptions['cache'];
if(!!process.env?.REDIS_CONNECTION_STRING?.trim()){
  const keyv = new Keyv({ store: new KeyvRedis({ uri: process.env.REDIS_CONNECTION_STRING }), namespace: 'compose-db-gateway' });
  // The typings are wrong on the upstream KeyvAdapter, so we need to ignore this
  // @ts-ignore
  cache = new KeyvAdapter(keyv);
  console.info("Using Redis cache");
}else {
  cache = new InMemoryLRUCache({
    maxSize: Math.pow(2, 20) * 128, // ~128 MiB
  });
  cache = new PrefixingKeyValueCache(cache, "gql:");
  console.info("Using In-memory cache");
}

const server = new ApolloServer({
  gateway,
  cache: cache,
  persistedQueries: {
    ttl: 60*60*24*2, // 48h
  },
  plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 10 })], //10s
});



const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.GRAPHQL_GATEWAY_PORT ? parseInt(process.env.GRAPHQL_GATEWAY_PORT) : 4000 },
  context: async ({ req }) => {
    return { viewerID: req.headers[VIEWER_ID_HEADER] || req.headers[VIEWER_ID_HEADER.toLowerCase()] }
  }
});

console.info(`🚀  Server ready at: ${url}`);
