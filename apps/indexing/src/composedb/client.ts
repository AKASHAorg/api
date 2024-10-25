import { ComposeClient } from "@composedb/client";
import { definition } from "@akashaorg/composedb-models/lib/runtime-definition.js";

export const composeClient = new ComposeClient({
  ceramic: process.env.CERAMIC_API_ENDPOINT,
  definition: definition,
});
