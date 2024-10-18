import { readEncodedComposite, serveEncodedDefinition } from "@composedb/devtools-node";
import { startGraphQLServer, getViewerID } from '@composedb/server';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { createContext, createGraphQLSchema } from '@composedb/runtime';
import { useResponseCache } from '@graphql-yoga/plugin-response-cache';
import type { CeramicAPI } from "@composedb/types";
import {
  type YogaInitialContext,
} from 'graphql-yoga'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const ceramicURL = process.env.CERAMIC_API_ENDPOINT || 'http://localhost:7007';
const composite = await readEncodedComposite(ceramicURL, path.resolve(__dirname, './composedb-runtime-definition.json'));

const definition = composite.toRuntime();
// temporary solution, the types do not match for CeramicClient
// from @ceramicnetwork/http-client and devtools-node
// because it's redefined in the http-client package
const ceramic = new CeramicClient(ceramicURL) as unknown as CeramicAPI;

/*
 * Starts a GraphQL server for the ComposeDB runtime definition.
 *
 * Parameters:
 * - ceramic: CeramicClient - Ceramic client instance for connecting to the Ceramic network
 * - options: Object
 *   - graphiql: boolean - Enable GraphiQL IDE for querying schema
 *   - context: Function - Creates the GraphQL context passed to resolvers
 *     - ctx: YogaInitialContext - Yoga GraphQL server context
 *     - Returns context needed for ComposeDB including ceramic client and viewer ID
 * - port: number - Port for the GraphQL server to listen on
 * - schema: GraphQLSchema - Schema created from the ComposeDB runtime definition
 *
 * Returns a Promise resolving to the started GraphQL Yoga server instance.
 */
const server = await startGraphQLServer({
  ceramic: ceramic,
  options: {
    graphiql: false,
    context: (ctx: YogaInitialContext) => {
      const fallbackViewerID = getViewerID(ctx.request);
      return {
        ...createContext({ ceramic: ceramic, fallbackViewerID }),
        isAuthenticated: () => !!fallbackViewerID,
      };
    },
    plugins: [
      useResponseCache({
        session: (request: Request) => getViewerID(request) || null,
        ttl: 10_000,
      }),
    ],
  },
  port: process.env.COMPOSEDB_GRAPHQL_PORT
    ? parseInt(process.env.COMPOSEDB_GRAPHQL_PORT)
    : 5001,
  schema: createGraphQLSchema({ definition, readonly: true }),
});

console.info(`ComposeDB graphQL service started on http://localhost:${server.port}/graphql`);

process.on("SIGTERM", async () => {
  await server.stop();
  console.info("ComposeDB graphQL service stopped");
});
