const config = require("../config/config");
const axios = require("axios").default;
var mongoHelper = require("./mongo.controller");
var Collection = require('../enums/collection.enum');
const redisController = require("./redis.controller");

class Watchlist {
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async fetchWatchlistFromApi(req, res) {
    let stocks = config.stocks;
    for (let stock of stocks) {
      console.log(stock);
      const url = `${config.alphaUrl}?function=GLOBAL_QUOTE&apikey=${config.alphaApiKey}&symbol=${stock}`;
      let response = await axios.get(url);
      let data = response.data;
      data = {
        symbol: stock,
        quote: data['Global Quote']
      }
      this.addwatchlistToCollection(data);
      await this.timeout(20000);
    }
    res.send('done');
  }

  async fetchWatchlist(req, res) {
    let data = await this.getWatchlistFromCollection();
    // res.send(data);
  }

  /// Database write method to add watchlist data to collection
  async addwatchlistToCollection(data) {
    await redisController.setData(Collection.QUOTE, data);
    await mongoHelper.setData(Collection.QUOTE, data, false);
  }

  /// Database read method to get data from collection
  async getWatchlistFromCollection() {
    let result = await redisController.getData(Collection.QUOTE);
    if(result.length == 0) {
      result = await mongoHelper.getData(Collection.QUOTE, {});
      for(let item of result) {
        await redisController.setData(Collection.QUOTE, item);
      }
    }
    return result;
  }
}
const watch = new Watchlist();

module.exports = watch;
