import { MutationResolvers } from '../__generated__/resolvers-types.js';
import { composeClient } from '../composedb/client.js';
import {
  indexApp,
  indexBeam,
  indexContentBlock,
  indexInterest,
  indexProfile,
  indexReflection
} from "../queue/create-job.js";

const mutations: MutationResolvers = {
  indexProfile: async (_, { capability, jws }, { dataSources }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }
    return indexProfile(validated.payload.ID);
  },

  indexBeam: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }
    return indexBeam(validated.payload.ID);
  },
  indexReflection: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }
   return indexReflection(validated.payload.ID);
  },
  indexContentBlock: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }
    return indexContentBlock(validated.payload.ID);

  },
  indexInterest: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.labelType) {
      throw new Error('Invalid or missing labelType in payload');
    }
    if (validated.didResolutionResult.didDocument.id !== composeClient.id) {
      throw new Error('Operation not permitted');
    }
    return indexInterest({
      labelType: validated.payload.labelType,
      value: validated.payload.value
    });
  },
  indexApp: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }

    if (validated.didResolutionResult.didDocument.id !== composeClient.id) {
      throw new Error('Operation not permitted');
    }
    return indexApp(validated.payload.ID);
  },
};

export default mutations;
