var mongo = require("mongodb");
// var mongoose = require("mongoose");
var config = require("../config/config");
var client = new mongo.MongoClient(config.mongoUrl);
var Collection = require('../enums/collection.enum');
var db;
class MongoController {
  async init() {
    try {
      await client.connect();
      console.log("Database created!");
      db = client.db(config.mongoDbName);
    } catch (err) {
      console.log(err);
    }
  }

  /// Generic function for user to read data from the database
  async getData(collectionName, filter = {}) {
    try {
      const collection = db.collection(collectionName);
      let data = await collection.find(filter).toArray();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /// Generic function for user to insert data in the database
  async setData(collectionName, data, isMany = false) {
    try {
      const collection = db.collection(collectionName);
      
      /// In case user is inserting an array of objects,
      /// isMany = true
      if(isMany) {
        return await collection.insertMany(data);
      } else {
        return await collection.insertOne(data);
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }


  async addNewsToCollection(data) {
    await this.setData(Collection.NEWS, data, true);
  }

  async addOverviewToCollection(data) {
    await this.setData(Collection.OVERVIEW, data, false);
  }

  async addTimeseriesToCollection(data) { 
    await this.setData(Collection.TIMESERIES, data, false);
  }

  async addUsers(data) {
    await this.setData(Collection.USERS, data, false);
  }

  async getUsers() {
    return await this.getData(Collection.USERS, {});
  }

  async addDepositTransaction(userId, amount) {
    let depositResult = await this.setData(Collection.DEPOSITS, {userId: userId, amount: amount}, false)

    await this.setData(Collection.TRANSACTIONS, {
      transactionId: mongo.ObjectId(depositResult.insertedId).toString(),
      transactionType: "deposit",
    }, false);
  }

  async addwatchlistToCollection(data) {
    await this.setData(Collection.WATCHLIST, data, true);
  }
}

const mongoHelper = new MongoController();
module.exports = mongoHelper;
