require("dotenv").config();
export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/servico-news",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "jd826==sg",
};
