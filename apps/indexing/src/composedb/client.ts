import { ComposeClient } from "@composedb/client";
import { definition } from "../config/runtime-definition.js";

export const composeClient = new ComposeClient({
  ceramic: process.env.CERAMIC_API_ENDPOINT,
  definition: definition,
});
