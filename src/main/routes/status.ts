import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";

import { makeStatusController } from "../factories/controllers/status/status-controller-factory";

export default (router: Router): void => {
  router.get("/status", adaptRoute(makeStatusController()));
};
