const config = require('../config/config');
const axios = require('axios').default;
var mongoHelper = require('./mongo.controller');

class AvController {
    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getNews(req, res) {
        const url = `${config.alphaUrl}?function=NEWS_SENTIMENT&apikey=${config.alphaApiKey}&topics=technology,earnings`;
        let response = await axios.get(url);
        let data = response.data;
        console.log(data);
        mongoHelper.addNewsToCollection(data.feed);
        res.send('OK');
    }

    async companyOverview() {
        let stocks = config.stocks;
        for (let stock of stocks) {
            console.log(stock);
            const url = `${config.alphaUrl}?function=OVERVIEW&apikey=${config.alphaApiKey}&symbol=${stock}`;
            let response = await axios.get(url);
            let data = response.data;
            mongoHelper.addOverviewToCollection(data);
            await this.timeout(20000);
        }
    }

    async dailyTimeSeries() {
        let stocks = config.stocks; 
        for (let stock of stocks) {
            console.log(stock);
            const url = `${config.alphaUrl}?function=TIME_SERIES_DAILY&apikey=${config.alphaApiKey}&symbol=${stock}&outputsize=full`
            let response = await axios.get(url);
            let data = response.data;
            let timeseries = data['Time Series (Daily)'];
            let obj = {
                symbol: stock,
                timeseries: timeseries
            };
            mongoHelper.addTimeseriesToCollection(obj);
            await this.timeout(20000);
        }
    }
}

const avHelper = new AvController();

module.exports = avHelper;