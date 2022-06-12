const config = require('../config/config');
const axios = require('axios').default;
var mongoHelper = require('./mongo.controller');
var Collection = require('../enums/collection.enum');
const AvlDatabases = require('../enums/database.enum');

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
    }

    /// Database write method to add news data for a ticker to collection
    async addTickerNewsToCollection(ticker, data) {
        await mongoHelper.setData(ticker, data, true, AvlDatabases.NEWS);
    }

    /// Database read method to get news feed
    async getNewsFeedFromCollection() {
        let data = await mongoHelper.getData(Collection.NEWS, {}, AvlDatabases.NEWS);
        return(data);
    }

    /// Database read method to get news feed for specific ticker
    async getTickerNewsFromCollection(ticker) {
        let data = await mongoHelper.getData(ticker, {}, AvlDatabases.NEWS);
        return data;
    }
}

const newsController = new NewsController();
module.exports = newsController;