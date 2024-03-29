import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper";
import env from "./config/env";
require("dotenv").config();

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(env.port, () => {
      console.log("Server On");
    });
  })
  .catch(console.error);
