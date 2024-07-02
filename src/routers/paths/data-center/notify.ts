import { NotifyModule } from "@main/notify/notify.module";

export const RouteNotify: FX_ROUTERS.TRouterConfigs = {
  path: "notify",
  module: NotifyModule,
  checks: {
    POST: [
      {
        suffix: "send",
        code: "POST-NOTIFY",
        name: "Send notification message to client.",
        auth: false,
      },
      {
        suffix: "multiple",
        code: "POST-MULTIPLE",
        name: "Send notification message to multiple client.",
        auth: false,
      },
      {
        suffix: "topics",
        code: "POST-TOPICS",
        name: "Send notification message by specific topics.",
        auth: false,
      },
      {
        suffix: "subscribe",
        code: "POST-SUB",
        name: "Add client to subscription topics.",
        auth: false,
      },
    ],
  },
};
