import { MutationResolvers } from '../__generated__/resolvers-types.js';
import { gqlClient } from "../composedb/sdk.js";
import { composeClient } from "../composedb/client.js";
import {
  IndexBeamStreamMutationVariables,
  IndexProfileStreamMutationVariables
} from "../__generated__/composedb-client.js";


const mutations: MutationResolvers = {
  indexProfile: async (_, { capability, jws }, { dataSources }) => {
    const validated = await composeClient.did.verifyJWS(jws, { capability: capability });
    if(!validated.payload.ID){
      throw new Error("Invalid or missing ID in payload");
    }
    const data: IndexProfileStreamMutationVariables = {
      i: {
        content: {
          active: true,
          createdAt: new Date().toISOString(),
          profileID: validated.payload.ID
        }
      }
    }
    const response = await gqlClient.IndexProfileStream(data);
    return {
      document: {
        id: response.createAkashaProfileStream.document.id,
        createdAt: response.createAkashaProfileStream.document.createdAt,
        profileID: response.createAkashaProfileStream.document.profileID,
      }
    }
  },

  indexBeam: async (_, {capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, { capability: capability });
    if(!validated.payload.ID){
      throw new Error("Invalid or missing ID in payload");
    }


    const data: IndexBeamStreamMutationVariables = {
      i: {
        content: {
          beamID: validated.payload.ID,
          createdAt: new Date().toISOString(),
          active: true
        }
      }
    }

    const response = await gqlClient.IndexBeamStream(data);

    return {
      document: {
        id: response.createAkashaBeamStream.document.id,
        createdAt: response.createAkashaBeamStream.document.createdAt,
        beamID: response.createAkashaBeamStream.document.beamID,
      }
    }
  }
};

export default mutations;
