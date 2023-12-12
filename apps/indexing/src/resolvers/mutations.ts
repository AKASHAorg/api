import {
  IndexReflectPayloadDocument,
  MutationResolvers
} from "../__generated__/resolvers-types.js";
import { gqlClient } from "../composedb/sdk.js";
import { composeClient } from "../composedb/client.js";
import {
  IndexAkashaAppsStreamMutation, IndexAkashaAppsStreamMutationVariables,
  IndexAkashaInterestsStreamMutationVariables,
  IndexAkashaReflectStreamMutationVariables,
  IndexBeamStreamMutationVariables, IndexContentBlockStreamMutationVariables,
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
  },
  indexReflection: async (_, {capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, { capability: capability });
    if(!validated.payload.ID){
      throw new Error("Invalid or missing ID in payload");
    }
    const reflection = await gqlClient.GetReflectionById(validated.payload.ID);
    if(!('id' in reflection.node)){
      throw new Error(`Reflection ${validated.payload.ID} was not found.`);
    }
    const data: IndexAkashaReflectStreamMutationVariables = {
      i: {
       content:{
         beamID: reflection.node.beamID,
         reflectionID: validated.payload.ID,
         createdAt: new Date().toISOString(),
         active: true
       }
      }
    }
    const response = await gqlClient.IndexAkashaReflectStream(data);

    return {
      document: {
        id: response.createAkashaReflectStream.document.id,
        createdAt: response.createAkashaReflectStream.document.createdAt,
        beamID: response.createAkashaReflectStream.document.beamID,
        reflectionID: validated.payload.ID,
      }
    }
  },
  indexContentBlock:  async (_, {capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, { capability: capability });
    if(!validated.payload.ID){
      throw new Error("Invalid or missing ID in payload");
    }


    const data: IndexContentBlockStreamMutationVariables = {
      i: {
        content: {
          blockID: validated.payload.ID,
          createdAt: new Date().toISOString(),
          active: true
        }
      }
    }

    const response = await gqlClient.IndexContentBlockStream(data);

    return {
      document: {
        id: response.createAkashaContentBlockStream.document.id,
        createdAt: response.createAkashaContentBlockStream.document.createdAt,
        blockID: validated.payload.ID,
      }
    }
  },
  indexInterest:  async (_, {capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, { capability: capability });
    if(!validated.payload.labelType){
      throw new Error("Invalid or missing labelType in payload");
    }
    if(validated.didResolutionResult.didDocument.id !== composeClient.id){
      throw new Error('Operation not permitted');
    }
    const { labelType, value } = validated.payload;
    const data: IndexAkashaInterestsStreamMutationVariables = {
      i: {
        content: {
          labelType: labelType,
          value: value,
          createdAt: new Date().toISOString(),
          active: true
        }
      }
    }

    const response = await gqlClient.IndexAkashaInterestsStream(data);

    return {
      document: {
        id: response.createAkashaInterestsStream.document.id,
        createdAt: response.createAkashaInterestsStream.document.createdAt,
        labelType: labelType,
        value: value
      }
    }
  },
  indexApp:  async (_, {capability, jws }) => {
    const validated = await composeClient.did.verifyJWS(jws, { capability: capability });
    if(!validated.payload.ID){
      throw new Error("Invalid or missing ID in payload");
    }

    if(validated.didResolutionResult.didDocument.id !== composeClient.id){
      throw new Error('Operation not permitted');
    }
    const data: IndexAkashaAppsStreamMutationVariables = {
      i: {
        content:{
          applicationID:validated.payload.ID,
          createdAt: new Date().toISOString(),
          active: true
        }
      }
    }
    const response = await gqlClient.IndexAkashaAppsStream(data);

    return {
      document: {
        id: response.createAkashaAppsStream.document.id,
        createdAt: response.createAkashaAppsStream.document.createdAt,
        applicationID: validated.payload.ID,
      }
    }
  },
};

export default mutations;
