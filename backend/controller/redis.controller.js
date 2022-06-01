const config = require('../config/config');
const redis = require('redis');
const client = redis.createClient({
    url: config.redisUrl
});
class RedisController {
    async init() {
        try {
            await client.connect();
            await client.set('myName', 'Stefano');
            const value = await client.get('myName');
            console.log(`myName: ${value}`);
        } catch (err) {
            console.log(err);
        }
    }
}

const redisHelper = new RedisController();
module.exports = redisHelper;