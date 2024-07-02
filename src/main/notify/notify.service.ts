import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import {
  MulticastMessage,
  TokenMessage,
  TopicMessage,
  getMessaging,
} from "firebase-admin/messaging";
import { SendMultipleDTO, SendNotifyDTO, SendTopicsDTO } from "@dtos/notify.dto";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

@Injectable()
export class NotifyService {
  constructor() {
    firebase.initializeApp({
      credential: applicationDefault(),
      // databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  /**
   * Use platform-specific fields when you want:
   * Sending columns only to certain platforms
   * Send platform-specific fields along with general fields
   * @param TokenMessage
   * @returns
   */

  public async sendSpecificDevice(data: SendNotifyDTO): Promise<string | void> {
    try {
      const receivedToken: string = data.token;
      const message: TokenMessage = {
        notification: {
          title: data.title,
          body: data.message,
        },
        android: {
          notification: {
            imageUrl: "https://res.cloudinary.com/dpr6tofwx/image/upload/v1719906913/wvozhxwdrat6v0gjopop.png"
          }
        },
        token: receivedToken,
      };

      return getMessaging().send(message);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async sendMultipleDevice(data: SendMultipleDTO) {
    try {
      const receivedToken: string[] = data.token;
      const message: MulticastMessage = {
        notification: {
          title: data.title,
          body: data.message,
        },
        tokens: receivedToken,
      };

      return getMessaging().sendEachForMulticast(message);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async sendToSpecificTopics(data: SendTopicsDTO) {
    try {
      const receiveTopics: string = data.topic;
      const message: TopicMessage = {
        notification: {
          title: data.title,
          body: data.message,
        },
        topic: receiveTopics,
      };

      return getMessaging().send(message);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async clientSubscribeToTopic(data: { tokens: string[]; topic: string }) {
    try {
      return getMessaging().subscribeToTopic(data.tokens, data.topic);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
