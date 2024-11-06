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
  UpdateBeamStreamMutationVariables,
} from '../__generated__/composedb-client.js';
import { indexingQueue } from './index.js';
import { delistJobKey, JobNames } from './config.js';
import { gqlClient } from '../composedb/sdk.js';
import { NotificationPayload } from './notifications.js';

export const indexProfile = async (streamID: string) => {
  const profile = await gqlClient.GetProfileById({ id: streamID });
  const data: IndexProfileStreamMutationVariables = {
    i: {
      content: {
        active: true,
        createdAt: new Date().toISOString(),
        profileID: streamID,
        appID:
          'appID' in profile.node && profile.node.appID
            ? profile.node.appID
            : undefined,
      },
    },
  };
  await indexingQueue.add(JobNames.indexProfile, data);
  return {
    document: {
      profileID: streamID,
    },
  };
};

export const indexBeam = async (streamID: string) => {
  const beam = await gqlClient.GetBeamById({ id: streamID });
  const data: IndexBeamStreamMutationVariables = {
    i: {
      content: {
        beamID: streamID,
        createdAt: new Date().toISOString(),
        active: true,
        appID:
          'appID' in beam.node && beam.node.appID ? beam.node.appID : undefined,
        status:
          'nsfw' in beam.node && beam.node.nsfw
            ? AkashaBeamStreamModerationStatus.Nsfw
            : undefined,
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
            indexType: 'core#tag',
            indexValue: tag.value,
            status: beam.node.nsfw
              ? AkashaIndexedStreamModerationStatus.Nsfw
              : undefined,
          },
        },
      };
      await indexingQueue.add(JobNames.indexStream, data);
    }
  }
  if ('mentions' in beam.node && beam.node.mentions?.length) {
    for (const did of beam.node.mentions) {
      if (did.id === beam.node.author?.id) {
        continue;
      }
      const data: CreateAkashaIndexedStreamMutationVariables = {
        i: {
          content: {
            active: true,
            createdAt: new Date().toISOString(),
            stream: streamID,
            streamType: AkashaIndexedStreamStreamType.Beam,
            indexType: 'core#mention',
            indexValue: did.id,
            status: beam.node.nsfw
              ? AkashaIndexedStreamModerationStatus.Nsfw
              : undefined,
          },
        },
      };
      await indexingQueue.add(JobNames.indexStream, data);
      try {
        await notifyMention({
          mentionDID: did.id,
          beamID: streamID,
          authorName: beam.node.author?.akashaProfile?.name,
          authorDID: beam.node.author.id,
          appID: beam.node.appID,
        });
      } catch (e) {
        console.warn('Could not notify mention', e);
      }
    }
  }

  return {
    document: {
      beamID: streamID,
    },
  };
};

export const indexReflection = async (streamID: string) => {
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
        replyTo: reflection.node?.reflection || undefined,
      },
    },
  };
  await indexingQueue.add(JobNames.indexReflection, data);
  await notifyReflection(streamID);
  return {
    document: {
      reflectionID: streamID,
    },
  };
};

export const indexContentBlock = async (streamID: string) => {
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
};

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
};

export const indexInterest = async (payload: {
  labelType: string;
  value: string;
}) => {
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
};

export const delistBeam = async (streamID: string) => {
  const data: UpdateBeamStreamMutationVariables = {
    i: {
      content: {
        active: false,
      },
      id: streamID,
      options: {
        shouldIndex: false,
      },
    },
  };
  await indexingQueue.add(JobNames.updateBeam, data);
  return {
    document: {
      beamID: streamID,
    },
  };
};

export const notifyFollow = async (streamID: string) => {
  const data = await gqlClient.GetFollowById({ id: streamID });
  if (!('node' in data) || !('did' in data.node)) {
    console.warn(`Follow ${streamID} was not found.`);
    return;
  }

  if (!data.node.isFollowing) {
    // not a follow event
    return;
  }

  const follower = data.node.did?.akashaProfile?.name ?? data.node.did.id;

  if (!data.node.profile?.did?.id.startsWith('did:pkh:')) {
    console.warn(`Cannot send notification to ${data.node.profile?.did?.id}`);
    return;
  }
  const notification: NotificationPayload = {
    title: 'New follow',
    body: `${follower} started following you.`,
    to: data.node.profile?.did?.id.replace('did:pkh:', ''),
    // index of the channel used to send the notification
    category: 2,
    meta: {
      // 0 custom meta
      // 2 notification channel/category(profile)
      type: '0+2',
      data: JSON.stringify({
        follower: data.node?.did?.id,
        appID: data.node.profile.appID,
      }),
    },
  };
  await indexingQueue.add(JobNames.sendNotification, notification);
};

export const notifyReflection = async (streamID: string) => {
  const data = await gqlClient.GetReflectionById({ id: streamID });
  if (!('node' in data) || !('author' in data.node)) {
    console.warn(`Reflection ${streamID} was not found.`);
    return;
  }

  const author = data.node.author?.akashaProfile?.name ?? data.node.author.id;

  if (!data.node.beam?.author?.id.startsWith('did:pkh:')) {
    console.warn(`Cannot send notification to ${data.node.beam?.author?.id}`);
    return;
  }
  if (data.node.beam?.author?.id === data.node.author.id) {
    // same author, no need to send notification
    return;
  }
  const notification: NotificationPayload = {
    title: 'New reflection',
    body: `${author} left a reflection on your beam.`,
    to: data.node.beam?.author?.id.replace('did:pkh:', ''),
    // index of the channel used to send the notification
    category: 1,
    meta: {
      // 0 custom meta
      // 1 notification channel/category(antenna)
      type: '0+1',
      data: JSON.stringify({
        author: data.node.author.id,
        reflectionID: streamID,
        beamID: data.node.beamID,
        appID: data.node.beam?.appID,
      }),
    },
  };
  await indexingQueue.add(JobNames.sendNotification, notification);
};

export type MentionNotificationPayload = {
  mentionDID: string;
  beamID: string;
  authorName: string;
  authorDID: string;
  appID: string;
};

export const notifyMention = async (opts: MentionNotificationPayload) => {
  if (!opts.mentionDID.startsWith('did:pkh:')) {
    console.warn(`Cannot send notification to ${opts.mentionDID}`);
    return;
  }
  const notification: NotificationPayload = {
    title: 'New mention',
    body: `${opts.authorName} mentioned you in a beam.`,
    to: opts.mentionDID.replace('did:pkh:', ''),
    category: 1,
    meta: {
      // 0 custom meta
      // 1 notification channel/category(antenna)
      type: '0+1',
      data: JSON.stringify({
        author: opts.authorDID,
        beamID: opts.beamID,
        appID: opts.appID,
      }),
    },
  };
  await indexingQueue.add(JobNames.sendNotification, notification);
};

export default {
  [JobNames.indexProfile]: indexProfile,
  [JobNames.indexBeam]: indexBeam,
  [delistJobKey(JobNames.indexBeam)]: delistBeam,
  [JobNames.indexReflection]: indexReflection,
  [JobNames.indexContentBlock]: indexContentBlock,
  [JobNames.indexApp]: indexApp,
  [JobNames.notifyFollow]: notifyFollow,
  [JobNames.notifyReflection]: notifyReflection,
};
