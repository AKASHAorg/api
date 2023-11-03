import { serveEncodedDefinition } from "@composedb/devtools-node";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


/**
 * Runs GraphiQL server to view & query composites.
 */
const server = await serveEncodedDefinition({
  ceramicURL: process.env.CERAMIC_API_ENDPOINT || "http://127.0.0.1:7007",
  graphiql: false,
  path: path.resolve(__dirname, './composedb-runtime-definition.json'),
  port: process.env.COMPOSEDB_GRAPHQL_PORT ? parseInt(process.env.COMPOSEDB_GRAPHQL_PORT) : 5001
});

console.info(`ComposeDB ffs graphQL service started on http://localhost:${server.port}/graphql`);

process.on("SIGTERM", async () => {
  await server.stop();
  console.info("ComposeDB graphQL service stopped");
});
