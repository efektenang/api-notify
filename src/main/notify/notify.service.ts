import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { SendNotifyDTO } from "@dtos/notify.dto";
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

  public async sendFirebaseMessages(data: SendNotifyDTO) {
    try {
      const receivedToken = data.token;
      const message = {
        notification: {
          title: data.title,
          body: data.message,
        },
        token: receivedToken,
      };

      return getMessaging().send(message);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
