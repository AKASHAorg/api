import { Resolver } from 'did-resolver';
import { getResolver } from 'pkh-did-resolver';
import KeyResolver from 'key-did-resolver';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { fromString } from 'uint8arrays/from-string';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import path from "path";
import { fileURLToPath } from "url";
import { composeClient } from "./composedb/client.js";
import resolvers from "./resolvers/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const privateKey = fromString(process.env.DID_INDEXING_PRIVATE_KEY, 'base16');


const pkhResolver = getResolver();
const keyDidResolver = KeyResolver.getResolver();
const resolver = new Resolver(
  {
    ...pkhResolver,
    ...keyDidResolver,
  },
  {
    cache: true,
  },
);

const did = new DID({
  resolver: resolver,
  provider: new Ed25519Provider(privateKey),
});
await did.authenticate();



composeClient.setDID(did);

// The GraphQL schema
const typeDefs = readFileSync(resolve(__dirname, './schema.graphql'), {
  encoding: 'utf-8',
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.GRAPHQL_INDEXING_PORT) || 4000}
});

console.log(`🚀 Server ready at ${url} ${composeClient.did.id}`);
