import { MutationResolvers } from '../__generated__/resolvers-types.js';
import { gqlClient } from '../composedb/sdk.js';
import { composeClient } from '../composedb/client.js';
import {
  AkashaBeamStreamModerationStatus,
  AkashaIndexedStreamModerationStatus,
  AkashaIndexedStreamStreamType,
  CreateAkashaIndexedStreamMutationVariables,
  IndexAkashaAppsStreamMutationVariables,
  IndexAkashaInterestsStreamMutationVariables,
  IndexAkashaReflectStreamMutationVariables,
  IndexBeamStreamMutationVariables,
  IndexContentBlockStreamMutationVariables,
  IndexProfileStreamMutationVariables
} from "../__generated__/composedb-client.js";
import { indexingQueue } from '../queue/index.js';
import { JobNames } from '../queue/config.js';

const mutations: MutationResolvers = {
  indexProfile: async (_, { capability, jws }, { dataSources }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }
    const data: IndexProfileStreamMutationVariables = {
      i: {
        content: {
          active: true,
          createdAt: new Date().toISOString(),
          profileID: validated.payload.ID,
        },
      },
    };
    await indexingQueue.add(JobNames.indexProfile, data);
    return {
      document: {
        profileID: validated.payload.ID,
      },
    };
  },

  indexBeam: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }
    const beam = await gqlClient.GetBeamById({ id: validated.payload.ID });
    const data: IndexBeamStreamMutationVariables = {
      i: {
        content: {
          beamID: validated.payload.ID,
          createdAt: new Date().toISOString(),
          active: true,
          status: ('nsfw' in beam.node && beam.node.nsfw) ? AkashaBeamStreamModerationStatus.Nsfw: undefined,
        },
      },
    };

    await indexingQueue.add(JobNames.indexBeam, data);

    if ('tags' in beam.node && beam.node.tags?.length) {
      for (const tag of beam.node.tags) {
        const data: CreateAkashaIndexedStreamMutationVariables = {
          i: {
            content: {
              active: true,
              createdAt: new Date().toISOString(),
              stream: validated.payload.ID,
              streamType: AkashaIndexedStreamStreamType.Beam,
              indexType: "core#tag",
              indexValue: tag.value,
              status: beam.node.nsfw ? AkashaIndexedStreamModerationStatus.Nsfw: undefined,
            },
          },
        };
        await indexingQueue.add(JobNames.indexStream, data);
      }
    }
    if ('mentions' in beam.node && beam.node.mentions?.length) {
      for (const did of beam.node.mentions) {
        const data: CreateAkashaIndexedStreamMutationVariables = {
          i: {
            content: {
              active: true,
              createdAt: new Date().toISOString(),
              stream: validated.payload.ID,
              streamType: AkashaIndexedStreamStreamType.Beam,
              indexType: "core#mention",
              indexValue: did.id,
              status: beam.node.nsfw ? AkashaIndexedStreamModerationStatus.Nsfw: undefined,
            },
          },
        };
        await indexingQueue.add(JobNames.indexStream, data);
      }
    }

    return {
      document: {
        beamID: validated.payload.ID,
      },
    };
  },
  indexReflection: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }
    const reflection = await gqlClient.GetReflectionById({ id: validated.payload.ID });
    if (!('id' in reflection.node)) {
      throw new Error(`Reflection ${validated.payload.ID} was not found.`);
    }
    const data: IndexAkashaReflectStreamMutationVariables = {
      i: {
        content: {
          beamID: reflection.node.beamID,
          reflectionID: validated.payload.ID,
          createdAt: new Date().toISOString(),
          active: true,
        },
      },
    };
    await indexingQueue.add(JobNames.indexReflection, data);
    return {
      document: {
        reflectionID: validated.payload.ID,
      },
    };
  },
  indexContentBlock: async (_, { capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, {
      capability: capability,
    });
    if (!validated.payload.ID) {
      throw new Error('Invalid or missing ID in payload');
    }

    const data: IndexContentBlockStreamMutationVariables = {
      i: {
        content: {
          blockID: validated.payload.ID,
          createdAt: new Date().toISOString(),
          active: true,
        },
      },
    };

    await indexingQueue.add(JobNames.indexContentBlock, data);
    return {
      document: {
        blockID: validated.payload.ID,
      },
    };
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
    const { labelType, value } = validated.payload;
    const data: IndexAkashaInterestsStreamMutationVariables = {
      i: {
        content: {
          labelType: labelType,
          value: value,
          createdAt: new Date().toISOString(),
          active: true,
        },
      },
    };

    await indexingQueue.add(JobNames.indexInterest, data);
    return {
      document: {
        labelType: labelType,
        value: value,
      },
    };
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
    const data: IndexAkashaAppsStreamMutationVariables = {
      i: {
        content: {
          applicationID: validated.payload.ID,
          createdAt: new Date().toISOString(),
          active: true,
        },
      },
    };
    await indexingQueue.add(JobNames.indexApp, data);
    return {
      document: {
        applicationID: validated.payload.ID,
      },
    };
  },
};

export default mutations;
