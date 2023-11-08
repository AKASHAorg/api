import type { DocumentNode } from 'graphql';
import { composeClient } from "./client.js";
import { getSdk } from "../__generated__/composedb-client.js";

const requester = async <R, V> (doc: DocumentNode, vars?: V, options?: unknown): Promise<R> => {
  const result = await composeClient.execute(doc, vars as Record<string, unknown> | undefined);

  if (!result.errors || !result.errors.length) {
    return result.data as R;
  }
  throw result.errors;
};

export const gqlClient = getSdk(requester);
