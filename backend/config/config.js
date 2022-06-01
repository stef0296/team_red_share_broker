const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    serverPort: process.env.PORT,
    mongoUrl: process.env.MONGOURL,
    redisUrl: process.env.REDIS_URL
}