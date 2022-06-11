var mongo = require("mongodb");
// var mongoose = require('mongoose');
var config = require("../config/config");
var client = new mongo.MongoClient(config.mongoUrl);
var db;
class MongoController {
  async init() {
    try {
      await client.connect();
      console.log("Database created!");
      db = client.db(config.mongoDbName);
      const collection = db.collection("test01");
    } catch (err) {
      console.log(err);
    }
  }

  async addNewsToCollection(data) {
    try {
      const collection = db.collection("news");
      await collection.insertMany(data);
    } catch (err) {
      console.log(err);
    }
  }

  async addOverviewToCollection(data) {
    try {
      const collection = db.collection("overview");
      await collection.insertOne(data);
    } catch (err) {
      console.log(err);
    }
  }

  async addTimeseriesToCollection(data) {
    try {
      const collection = db.collection("timeseries");
      await collection.insertOne(data);
    } catch (err) {
      console.log(err);
    }
  }

  async addUsers(data) {
    const collection = db.collection('users');
    await collection.insertMany(data);
  }

  async getUsers() {
    const collection = db.collection('users');
    let users = await collection.find({}).toArray();
    return users;
  }

  async addDepositTransaction(userId, amount) {
    const transactionCollection = db.collection('transactions');
    const depositCollection = db.collection('deposits');

    let depositResult = await depositCollection.insertOne({
      userId: userId,
      amount: amount,
    });

    await transactionCollection.insertOne({
      transactionId: mongo.ObjectId(depositResult.insertedId).toString(),
      transactionType: 'deposit'
    });
  }

  async addwatchlistToCollection(data) {
    try {
      const collection = db.collection("list");
      await collection.insertMany(data);
    } catch (err) {
      console.log(err);
    }
  }
}

const mongoHelper = new MongoController();
module.exports = mongoHelper;
