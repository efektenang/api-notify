import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";
import { mapLimit } from "async";
import * as shell from "shelljs";
import { chunk } from "lodash";
import { ISendFirebaseMessages } from "@interfaces/notify.interface";
import { applicationDefault } from "firebase-admin/app";

@Injectable()
export class NotifyService {
  constructor() {
    const firebaseCredentials = JSON.parse(
      process.env.FIREBASE_CREDENTIAL_JSON
    );
    firebase.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }

  public async sendFirebaseMessages(
    firebaseMessages: ISendFirebaseMessages[],
    dryRun?: boolean
  ): Promise<BatchResponse> {
    const batchedFirebaseMessages = chunk(firebaseMessages, 500);

    const batchResponses = await mapLimit<
      ISendFirebaseMessages[],
      BatchResponse
    >(
      batchedFirebaseMessages,
      process.env.FIREBASE_PARALLEL_LIMIT, // 3 is a good place to start
      async (
        groupedFirebaseMessages: ISendFirebaseMessages[]
      ): Promise<BatchResponse> => {
        try {
          const tokenMessages: firebase.messaging.TokenMessage[] =
            groupedFirebaseMessages.map(({ message, title, token }) => ({
              notification: { body: message, title },
              token,
              apns: {
                payload: {
                  aps: {
                    "content-available": 1,
                  },
                },
              },
            }));

          return await this.sendAll(tokenMessages, dryRun);
        } catch (error) {
          return {
            responses: groupedFirebaseMessages.map(() => ({
              success: false,
              error,
            })),
            successCount: 0,
            failureCount: groupedFirebaseMessages.length,
          };
        }
      }
    );

    return batchResponses.reduce(
      ({ responses, successCount, failureCount }, currentResponse) => {
        return {
          responses: responses.concat(currentResponse.responses),
          successCount: successCount + currentResponse.successCount,
          failureCount: failureCount + currentResponse.failureCount,
        };
      },
      {
        responses: [],
        successCount: 0,
        failureCount: 0,
      } as unknown as BatchResponse
    );
  }

  public async sendAll(
    messages: firebase.messaging.TokenMessage[],
    dryRun?: boolean
  ): Promise<BatchResponse> {
    if (process.env.NEST_ENV === "dev") {
      for (const { notification, token } of messages) {
        shell.exec(
          `echo '{ "aps": { "alert": ${JSON.stringify(notification)}, "token": "${token}" } }' | xcrun simctl push booted com.company.appname -`
        );
      }
    }
    return firebase.messaging().sendAll(messages, dryRun);
  }
}
