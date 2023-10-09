import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const supergraph = readFileSync(resolve(__dirname, '../../../config/supergraph.graphql')).toString();

const gateway = new ApolloGateway({
  supergraphSdl: supergraph
});


const server = new ApolloServer({
  gateway
});



const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.info(`🚀  Server ready at: ${url}`);
