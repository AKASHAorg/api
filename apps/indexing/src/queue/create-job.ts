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
  IndexProfileStreamMutationVariables,
  UpdateAkashaBeamStreamInput,
  UpdateAkashaReflectStreamInput,
  UpdateBeamStreamMutationVariables
} from "../__generated__/composedb-client.js";
import { indexingQueue } from "./index.js";
import { delistJobKey, JobNames } from "./config.js";
import { gqlClient } from "../composedb/sdk.js";

export const indexProfile = async (streamID: string) => {
  const data: IndexProfileStreamMutationVariables = {
    i: {
      content: {
        active: true,
        createdAt: new Date().toISOString(),
        profileID: streamID,
      },
    },
  };
  await indexingQueue.add(JobNames.indexProfile, data);
  return {
    document: {
      profileID: streamID,
    },
  };
}


export const indexBeam = async (streamID: string) => {
   const beam = await gqlClient.GetBeamById({ id: streamID });
   const data: IndexBeamStreamMutationVariables = {
     i: {
       content: {
         beamID: streamID,
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
             stream: streamID,
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
             stream: streamID,
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
       beamID: streamID,
     },
   };
 }

export const indexReflection = async(streamID: string) => {
   const reflection = await gqlClient.GetReflectionById({ id: streamID });
   if (!('id' in reflection.node)) {
     throw new Error(`Reflection ${streamID} was not found.`);
   }
   const data: IndexAkashaReflectStreamMutationVariables = {
     i: {
       content: {
         beamID: reflection.node.beamID,
         reflectionID: streamID,
         createdAt: new Date().toISOString(),
         active: true,
         isReply: reflection.node?.isReply || false,
         replyTo: reflection.node?.reflection || undefined
       },
     },
   };
   await indexingQueue.add(JobNames.indexReflection, data);
   return {
     document: {
       reflectionID: streamID,
     },
   };
}

export const indexContentBlock = async (streamID: string) =>{
  const data: IndexContentBlockStreamMutationVariables = {
    i: {
      content: {
        blockID: streamID,
        createdAt: new Date().toISOString(),
        active: true,
      },
    },
  };

  await indexingQueue.add(JobNames.indexContentBlock, data);
  return {
    document: {
      blockID: streamID,
    },
  };
}

export const indexApp = async (streamID: string) => {
  const data: IndexAkashaAppsStreamMutationVariables = {
    i: {
      content: {
        applicationID: streamID,
        createdAt: new Date().toISOString(),
        active: true,
      },
    },
  };
  await indexingQueue.add(JobNames.indexApp, data);
  return {
    document: {
      applicationID: streamID,
    },
  };
}

export const indexInterest = async (payload: { labelType: string, value: string }) => {
  const { labelType, value } = payload;
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
}

export const delistBeam = async (streamID: string) => {
  const data: UpdateBeamStreamMutationVariables = {
    i: {
      content: {
        active: false
      },
      id: streamID,
      options: {
        shouldIndex: false
      }
    }
  };
  await indexingQueue.add(JobNames.updateBeam, data);
  return {
    document: {
      beamID: streamID
    }
  };
}



export default {
  [JobNames.indexProfile]: indexProfile,
  [JobNames.indexBeam]: indexBeam,
  [delistJobKey(JobNames.indexBeam)]: delistBeam,
  [JobNames.indexReflection]: indexReflection,
  [JobNames.indexContentBlock]: indexContentBlock,
  [JobNames.indexApp]: indexApp,
}
