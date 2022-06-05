var mongo = require('mongodb');
// var mongoose = require('mongoose');
var config = require('../config/config');
var client = new mongo.MongoClient(config.mongoUrl);
var db;
class MongoController {
    async init() {
        try {
            await client.connect();
            console.log("Database created!");
            db = client.db(config.mongoDbName);
            const collection = db.collection('test01');
        } catch (err) {
            console.log(err);
        }
    }

    async addNewsToCollection(data) {
        try {
            const collection = db.collection('news');
            await collection.insertMany(data);
        } catch (err) {
            console.log(err);
        }
    }
}

const mongoHelper = new MongoController();
module.exports = mongoHelper;