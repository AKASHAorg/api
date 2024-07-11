import { Job } from 'bullmq';
import { JobNames } from "./config.js";
import { gqlClient } from "../composedb/sdk.js";
import { composeClient } from "../composedb/client.js";

/**
 * Handles indexing jobs for various Akasha data streams.
 *
 * @param job - The job object containing the job data.
 * @returns The indexed data document.
 */
const indexingWorker = async (job: Job) => {
  console.info(job.name);
  switch (job.name) {
    case JobNames.indexApp:
      const appData = await gqlClient.IndexAkashaAppsStream(job.data);
      return appData.setAkashaAppsStream.document;
    case JobNames.indexBeam:
      const beamData = await gqlClient.IndexBeamStream(job.data);
      return beamData.setAkashaBeamStream.document;
    case JobNames.indexInterest:
      const interestsData = await gqlClient.IndexAkashaInterestsStream(job.data);
      return interestsData.setAkashaInterestsStream.document;
    case JobNames.indexProfile:
      const profile = await gqlClient.GetProfileStream({
        indexer: composeClient.id,
        last: 1,
        filters: {
          where: {
            profileID: {equalTo: job.data.i.content.profileID }
          }
        }
      });
      if('akashaProfileStreamList' in profile.node && profile.node.akashaProfileStreamList.edges.length) {
       return profile.node.akashaProfileStreamList.edges[0].node;
      }
      const profileData = await gqlClient.IndexProfileStream(job.data);
      return profileData.setAkashaProfileStream.document;
    case JobNames.indexReflection:
      const reflectionData = await gqlClient.IndexAkashaReflectStream(job.data);
      return reflectionData.setAkashaReflectStream.document;
    case JobNames.indexContentBlock:
      const blockData = await gqlClient.IndexContentBlockStream(job.data);
      return blockData.setAkashaContentBlockStream.document;
    case JobNames.indexStream:
      const indexedData = await gqlClient.CreateAkashaIndexedStream(job.data);
      return indexedData.setAkashaIndexedStream.document;
    case JobNames.updateBeam:
      if(job.data?.i?.options.hasOwnProperty('shouldIndex')){
        if(job.data.i.options.shouldIndex === false){
          const beam = await gqlClient.GetBeamStream({
            indexer: composeClient.id,
            last: 1,
            filters: {
              where: {
                beamID: {equalTo: job.data.i.id }
              }
            }
          });

          if('akashaBeamStreamList' in beam.node && beam.node.akashaBeamStreamList.edges.length) {
            job.data.i.id = beam.node.akashaBeamStreamList.edges[0].node.id;
          }
        }
      }
      const updateBeamData = await gqlClient.UpdateBeamStream(job.data);
      return updateBeamData.updateAkashaBeamStream.document;
    default:
      console.warn('Unknown job type');
      break;
  }
}

export default indexingWorker;
