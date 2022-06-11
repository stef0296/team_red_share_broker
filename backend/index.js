const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const mongoHelper = require("./controller/mongo.controller");
const redisHelper = require("./controller/redis.controller");
const avHelper = require("./controller/av.controller");
const newsController = require("./controller/news.controller");
const watch = require("./controller/watchlist");

const app = express();
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get("/", (_, res, next) =>
  res.send("Team Red | Share Broker API Services")
);
app.get("/av-news", (req, res, next) => newsController.fetchNewsFromApi(req, res));
app.get("/watchlist", (req, res, next) => watch.getwatchlist(req, res));

app.listen(config.serverPort, () => {
  console.log(`App listening on port ${config.serverPort}`);
  mongoHelper.init();
  redisHelper.init();
});
