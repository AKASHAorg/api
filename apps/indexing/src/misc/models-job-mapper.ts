import { definition } from "@akashaorg/composedb-models/lib/runtime-definition.js";
import { JobNames } from "../queue/config.js";


const { models } = definition;
/**
 * Maps a model ID to a corresponding job name for indexing.
 *
 * @param modelID - The ID of the model to map to a job name.
 * @returns The job name corresponding to the given model ID, or `null` if no mapping is found.
 */
export default function modelsJobMapper (modelID: string): JobNames | null {

  switch (modelID) {
    case models.AkashaApp.id:
      return JobNames.indexApp;
    case models.AkashaBeam.id:
      return JobNames.indexBeam;
    case models.AkashaBeamInterface.id:
      return JobNames.indexBeam;
    case models.AkashaAppRelease.id:
      return JobNames.indexAppRelease;
    case models.AkashaAppReleaseInterface.id:
      return JobNames.indexAppRelease;
    case models.AkashaContentBlock.id:
      return JobNames.indexContentBlock;
    case models.AkashaContentBlockInterface.id:
      return JobNames.indexContentBlock;
    case models.AkashaProfile.id:
      return JobNames.indexProfile;
    case models.AkashaProfileInterface.id:
      return JobNames.indexProfile;
    case models.AkashaReflect.id:
      return JobNames.indexReflection;
    case models.AkashaReflectInterface.id:
      return JobNames.indexReflection;
    case models.AkashaFollow.id:
      return JobNames.notifyFollow;
    default: {
      return null;
    }
  }
}
