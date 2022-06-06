const config = require('../config/config');
const axios = require('axios').default;
var mongoHelper = require('./mongo.controller');

class AvController {
    async getNews(req, res) {
        const url = `${config.alphaUrl}?function=NEWS_SENTIMENT&apikey=${config.alphaApiKey}&topics=technology,earnings`;
        let response = await axios.get(url);
        let data = response.data;
        console.log(data);
        mongoHelper.addNewsToCollection(data.feed);
        res.send('OK');
    }

    async companyOverview() {
        let symbol = 'AAPL';
        const url = `${config.alphaUrl}?function=OVERVIEW&apikey=${config.alphaApiKey}&symbol=${symbol}`;
    }

    async dailyTimeSeries() {
        let symbol = 'AAPL';
        const url = `${config.alphaUrl}?function=TIME_SERIES_DAILY&apikey=${config.alphaApiKey}&symbol=${symbol}&outputsize=full`
    }
}

const avHelper = new AvController();

module.exports = avHelper;