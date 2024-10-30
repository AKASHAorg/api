import { ethers } from 'ethers';
import { CONSTANTS, PushAPI } from '@pushprotocol/restapi';


export const notificationTTL = 1000 * 60 * 60 * 24 * 21; // 21 days
let pushClient: PushAPI;

/**
 * Retrieves a PushAPI client instance
 *
 * @returns {Promise<PushAPI>} The PushAPI client instance.
 * @throws {Error} If the NOTIFICATIONS_KEY_MNEMONIC environment variable is missing.
 */
export const getPushClient = async (): Promise<PushAPI> => {
  if (pushClient) {
    return pushClient;
  }
  if (!process.env?.NOTIFICATIONS_KEY_MNEMONIC) {
    throw new Error('Missing NOTIFICATIONS_KEY_MNEMONIC');
  }
  const signer = ethers.Wallet.fromPhrase(
    process.env.NOTIFICATIONS_KEY_MNEMONIC,
  );
  pushClient = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });
  return pushClient;
};

export type NotificationPayload = {
  title: string;
  body: string;
  to: string;
  // index of the channel used to send the notification
  category: number;
  meta: {
    //custom meta type
    type: `${0}+${number}`;
    data: string;
  };
};
