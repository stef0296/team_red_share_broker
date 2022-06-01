var mongo = require('mongodb');
var client = mongo.MongoClient;
var config = require('../config/config');

class MongoController {
    init() {
        try {
            client.connect(config.mongoUrl, function (err, db) {
                if (err) throw err;
                console.log("Database created!");
                db.close();
            });
        } catch (err) {
            console.log(err);
        }
    }
}

const mongoHelper = new MongoController();
module.exports = mongoHelper;