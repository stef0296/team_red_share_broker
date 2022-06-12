const config = require("../config/config");
const redis = require("redis");
const client = redis.createClient({
  url: config.redisUrl,
});
class RedisController {
  async init() {
    try {
      await client.connect();
      await client.set("myName", "teamred");
      const value = await client.get("myName");
      console.log(`myName: ${value}`);
    } catch (err) {
      console.log(err);
    }
  }

  async getData(key) {
    try {
      let result = await client.LRANGE(key, 0, -1);
      for(let i = 0; i < result.length; i++) {
        result[i] = JSON.parse(result[i]);
      }
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async setData(key, value) {
    try {
      await client.RPUSH(key, JSON.stringify(value));
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const redisController = new RedisController();
module.exports = redisController;
