import { ComposeClient } from '@composedb/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//import apolloClient from '@apollo/client';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { fromString } from 'uint8arrays/from-string';

import { readFileSync } from 'fs';
import { resolve } from 'path';
import mutations from './resolvers/mutations.js';
import queries from './resolvers/queries.js';
import { Resolvers } from './__generated__/resolvers-types.js';
import { definition } from './config/runtime-definition.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const privateKey = fromString(process.env.DID_INDEXING_PRIVATE_KEY, 'base16');

const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(privateKey),
});
await did.authenticate();

const compose = new ComposeClient({
  ceramic: process.env.CERAMIC_API_ENDPOINT,
  definition: definition,
});

compose.setDID(did);


// The GraphQL schema
const typeDefs = readFileSync(resolve(__dirname, './schema.graphql'), {
  encoding: 'utf-8',
});

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
  ...queries,
  ...mutations,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
