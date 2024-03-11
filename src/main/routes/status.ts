import { type Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";

import { makeStatusController } from "../factories/controllers/status/status-controller-factory";

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get("/status", adaptRoute(makeStatusController()));
};
