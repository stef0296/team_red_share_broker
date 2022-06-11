var mongo = require("mongodb");
// var mongoose = require("mongoose");
var config = require("../config/config");
var client = new mongo.MongoClient(config.mongoUrl);
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
    await this.setData("news", data, true);
  }

  async addOverviewToCollection(data) {
    await this.setData("overview", data, false);
  }

  async addTimeseriesToCollection(data) { 
    await this.setData("timeseries", data, false);
  }

  async addUsers(data) {
    await this.setData("users", data, false);
  }

  async getUsers() {
    return await this.getData("users", {});
  }

  async addDepositTransaction(userId, amount) {
    const transactionCollection = db.collection("transactions");

    let depositResult = await this.setData("deposits", {userId: userId, amount: amount}, false)

    await this.setData("transactions", {
      transactionId: mongo.ObjectId(depositResult.insertedId).toString(),
      transactionType: "deposit",
    }, false);
  }

  async addwatchlistToCollection(data) {
    await this.setData("list", data, true);
  }
}

const mongoHelper = new MongoController();
module.exports = mongoHelper;
