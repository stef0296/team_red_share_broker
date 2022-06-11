const config = require('../config/config');
const axios = require('axios').default;
var mongoHelper = require('./mongo.controller');
var Collection = require('../enums/collection.enum');

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
    async fetchNewsForTickerFromApi(req, res) {}

    /// Endpoint to fetch news data from MongoDB collection
    async fetchNewsFeed(req, res) {}

    /// Endpoint to fetch news data for a specific ticker from MongoDB collection
    async fetchNewsFeedForTicker(req, res) {}

    /// Database write method to add news to collection
    async addNewsToCollection(data) {
        await mongoHelper.setData(Collection.NEWS, data, true);
    }

    /// Database write method to add news data for a ticker to collection
    async addTickerNewsToCollection(ticker, data) {}

    /// Database read method to get news feed
    async getNewsFeedFromCollection() {}

    /// Database read method to get news feed for specific ticker
    async getTickerNewsFromCollection(ticker) {}
}

const newsController = new NewsController();
module.exports = newsController;