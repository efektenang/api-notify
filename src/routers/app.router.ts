import { RouteLogs } from "./paths/data-center/logs";
import { RouteNotify } from "./paths/data-center/notify";

export const routes: FX_ROUTERS.TRouterConfigs[] = [
  {
    path: "api/v1",
    children: [
      // Data Center
      RouteLogs,
      RouteNotify
    ],
  },
];
