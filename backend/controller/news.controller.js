const config = require('../config/config');
const axios = require('axios').default;
var mongoHelper = require('./mongo.controller');
var Collection = require('../enums/collection.enum');
const AvlDatabases = require('../enums/database.enum');
const redisController = require('./redis.controller');

class NewsController {

    /// Endpoint to fetch news data from source API
    /// and add it to the MongoDB collection
    async fetchNewsFromApi(req, res) {
        const url = `${config.alphaUrl}?function=NEWS_SENTIMENT&apikey=${config.alphaApiKey}&topics=technology,earnings`;
        let response = await axios.get(url);
        let data = response.data;
        console.log(data);
        await this.addNewsToCollection(data.feed);
        res.send('OK');
    }

    /// Endpoint to fetch news data for a specific ticker
    /// and add it to the MongoDB collection
    async fetchNewsForTickerFromApi(req, res) {
        let ticker = req.query.ticker;
        const url = `${config.alphaUrl}?function=NEWS_SENTIMENT&apikey=${config.alphaApiKey}&ticker=${ticker}`;
        let response = await axios.get(url);
        let data = response.data;
        console.log(data);
        await this.addTickerNewsToCollection(ticker, data.feed);
        res.send('OK');
    }

    /// Endpoint to fetch news data from MongoDB collection
    async fetchNewsFeed(req, res) {
       let response = await this.getNewsFeedFromCollection();
       res.send(response);
    }

    /// Endpoint to fetch news data for a specific ticker from MongoDB collection
    async fetchNewsFeedForTicker(req, res) {
        let ticker = req.query.ticker;
        let response = await this.getTickerNewsFromCollection(ticker);
        res.send(response);
    }

    /// Database write method to add news to collection
    async addNewsToCollection(data) {
        await mongoHelper.setData(Collection.NEWS, data, true, AvlDatabases.NEWS);
        for(let item of data) {
            await redisController.setData(Collection.NEWS, item);
        }
    }

    /// Database write method to add news data for a ticker to collection
    async addTickerNewsToCollection(ticker, data) {
        await mongoHelper.setData(ticker, data, true, AvlDatabases.NEWS);
        for(let item of data) {
            await redisController.setData(`${Collection.NEWS}-${ticker}`, item);
        }
    }

    /// Database read method to get news feed
    async getNewsFeedFromCollection() {
        let result = await redisController.getData(Collection.NEWS);
    
        /// If data is not cached in redis, fetch data from mongoDB and cache it before returning the result
        if(result.length == 0) {
          result = await mongoHelper.getData(Collection.NEWS, {});
          for(let item of result) {
            await redisController.setData(Collection.NEWS, item);
          }
        }
        return result;
    }

    /// Database read method to get news feed for specific ticker
    async getTickerNewsFromCollection(ticker) {
        let result = await redisController.getData(`${Collection.NEWS}-${ticker}`);
    
        /// If data is not cached in redis, fetch data from mongoDB and cache it before returning the result
        if(result.length == 0) {
          result = await mongoHelper.getData(ticker, {}, AvlDatabases.NEWS);
          for(let item of result) {
            await redisController.setData(`${Collection.NEWS}-${ticker}`, item);
          }
        }
        return result;
    }
}

const newsController = new NewsController();
module.exports = newsController;