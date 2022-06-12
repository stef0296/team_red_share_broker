var mongo = require("mongodb");
// var mongoose = require("mongoose");
var config = require("../config/config");
var client = new mongo.MongoClient(config.mongoUrl);
var Collection = require('../enums/collection.enum');
const AvlDatabases = require("../enums/database.enum");
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
  async getData(collectionName, filter = {}, database = AvlDatabases.DB01) {
    try {
      db = client.db(database);
      const collection = db.collection(collectionName);
      let data = await collection.find(filter).toArray();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /// Generic function for user to insert data in the database
  async setData(collectionName, data, isMany = false, database = AvlDatabases.DB01) {
    try {
      db = client.db(database);
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

  /// Add company overview data to database 
  async addOverviewToCollection(data) {
    await this.setData(Collection.OVERVIEW, data, false);
  }

  /// Add Timeseries for a specific stock to database
  async addTimeseriesToCollection(data) { 
    await this.setData(Collection.TIMESERIES, data, false);
  }

  /// Add Users to database collection
  async addUsers(data) {
    await this.setData(Collection.USERS, data, false);
  }

  /// Get list of users from database
  async getUsers() {
    return await this.getData(Collection.USERS, {});
  }
}

const mongoHelper = new MongoController();
module.exports = mongoHelper;
