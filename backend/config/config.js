const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serverPort: process.env.PORT,
    mongoUrl: process.env.MONGOURL,
    mongoDbName: process.env.MONGO_DB_NAME,
    redisUrl: process.env.REDIS_URL,
    alphaUrl: process.env.ALPHAURL,
    alphaApiKey: process.env.ALPHAAPIKEY,
}