import { type Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";

import { makeSingUpController } from "../factories/controllers/singup/singup-controller-factory";
import { makeLoginController } from "../factories/controllers/login/login-controller-factory";

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post("/singup", adaptRoute(makeSingUpController()));
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post("/login", adaptRoute(makeLoginController()));
};
