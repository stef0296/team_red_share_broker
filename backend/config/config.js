const dotenv = require('dotenv');
const stocks = [
    'AAPL',
    'MSFT',
    'AMZN',
    'TSLA',
    'GOOG',
    'GOOGL',
    'FB',
    'NVDA',
    'AVGO',
    'PEP',
    'COST',
    'ADBE',
    'CMCSA',
    'CSCO',
    'INTC',
    'AMD',
    'TMUS',
    'TXN',
    'QCOM',
    'AMGN',
];
dotenv.config();

module.exports = {
    serverPort: process.env.PORT,
    mongoUrl: process.env.MONGOURL,
    mongoDbName: process.env.MONGO_DB_NAME,
    redisUrl: process.env.REDIS_URL,
    alphaUrl: process.env.ALPHAURL,
    alphaApiKey: process.env.ALPHAAPIKEY,
    stocks: stocks,
}