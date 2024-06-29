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
    ],
  },
};
