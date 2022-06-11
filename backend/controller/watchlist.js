const config = require("../config/config");
const axios = require("axios").default;
var mongoHelper = require("./mongo.controller");

class Watchlist {
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getwatchlist(req, res) {
    let stocks = config.stocks;
    for (let stock of stocks) {
      console.log(stock);
      const url = `${config.alphaUrl}?function=GLOBAL_QUOTE&apikey=${config.alphaApiKey}&symbol=${stock}`;
      let response = await axios.get(url);
      let data = response.data;
      mongoHelper.addwatchlistToCollection(data);
      await this.timeout(20000);
    }
  }
}
const watch = new Watchlist();

module.exports = watch;
