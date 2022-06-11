const config = require('../config/config');
const axios = require('axios').default;
var mongoHelper = require('./mongo.controller');
var Collection = require('../enums/collection.enum');

class NewsController {
    async getNews(req, res) {
        const url = `${config.alphaUrl}?function=NEWS_SENTIMENT&apikey=${config.alphaApiKey}&topics=technology,earnings`;
        let response = await axios.get(url);
        let data = response.data;
        console.log(data);
        await this.addNewsToCollection(data.feed);
        res.send('OK');
    }

    /// Add news collection to database
    async addNewsToCollection(data) {
        await mongoHelper.setData(Collection.NEWS, data, true);
    }
}

const newsController = new NewsController();
module.exports = newsController;