const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const mongoHelper = require("./controller/mongo.controller");
const redisHelper = require("./controller/redis.controller");
const newsController = require("./controller/news.controller");
const watchlistController = require("./controller/watchlist.controller");

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

app.get("/av-ticker-news", (req, res, next) => newsController.fetchNewsForTickerFromApi(req, res));

app.get("/fetch-news", (req, res, next) => newsController.fetchNewsFeed(req, res));

app.get("/fetch-ticker-news", (req, res, next) => newsController.fetchNewsFeedForTicker(req, res));

app.get("/build-watchlist", (req, res, next) => watchlistController.fetchWatchlistFromApi(req, res));

app.get("/get-watchlist", (req, res, next) => watchlistController.fetchWatchlist(req, res));

app.listen(config.serverPort, async () => {
  console.log(`App listening on port ${config.serverPort}`);
  await mongoHelper.init();
  await redisHelper.init();
});
