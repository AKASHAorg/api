import { Job } from 'bullmq';
import { JobNames } from "./config.js";
import { gqlClient } from "../composedb/sdk.js";

const indexingWorker = async (job: Job) => {
  console.info(job.name);
  switch (job.name) {
    case JobNames.indexApp:
      const appData = await gqlClient.IndexAkashaAppsStream(job.data);
      return appData.createAkashaAppsStream.document;
    case JobNames.indexBeam:
      const beamData = await gqlClient.IndexBeamStream(job.data);
      return beamData.createAkashaBeamStream.document;
    case JobNames.indexInterest:
      const interestsData = await gqlClient.IndexAkashaInterestsStream(job.data);
      return interestsData.createAkashaInterestsStream.document;
    case JobNames.indexProfile:
      const profileData = await gqlClient.IndexProfileStream(job.data);
      return profileData.createAkashaProfileStream.document;
    case JobNames.indexReflection:
      const reflectionData = await gqlClient.IndexAkashaReflectStream(job.data);
      return reflectionData.createAkashaReflectStream.document;
    case JobNames.indexContentBlock:
      const blockData = await gqlClient.IndexContentBlockStream(job.data);
      return blockData.createAkashaContentBlockStream.document;
    case JobNames.indexStream:
      const indexedData = await gqlClient.CreateAkashaIndexedStream(job.data);
      return indexedData.createAkashaIndexedStream.document;
    default:
      console.warn('Unknown job type');
      break;
  }
}

export default indexingWorker;
