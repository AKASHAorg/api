export const INDEXING_QUEUE_NAME = "indexing-composedb";
export const enum JobNames{
  indexProfile="indexProfile",
  indexBeam="indexBeam",
  indexReflection="indexReflection",
  indexContentBlock="indexContentBlock",
  indexInterest="indexInterest",
  indexApp="indexApplication",
  indexAppRelease = "indexAppRelease",
  indexStream="indexStream",
  updateBeam = "updateBeam",
  updateReflection = "updateReflection",
  updateContentBlock = "updateContentBlock",
  updateProfile = "updateProfile",
  updateApp = "updateApp",
  updateAppRelease = "updateAppRelease",

  notifyFollow = "notifyFollow",
  notifyReflection = "notifyReflection",
  sendNotification = "sendNotification",
}

export const delistJobPrefix = "delist:";
export const delistJobKey = (jobName: string) => `${delistJobPrefix}${jobName}`;
