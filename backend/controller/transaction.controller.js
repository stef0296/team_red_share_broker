const MIN_DEPOSIT_AMOUNT = 50;
const MAX_DEPOSIT_AMOUNT = 2000;
var mongo = require('mongodb');
const config = require('../config/config');
const Collection = require('../enums/collection.enum');
const mongoHelper = require('./mongo.controller');

class TransactionController {
    /// Function to pick a random number between a given range
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * The `simulateDeposits` function is designed to simulate a defined number of deposit transactions
     * The logic implemented for this is as follows:
     * 1. Get a list of all users from the DB collection
     * 2. Pick a random number of transactions to simulate
     * 3. For each transaction:
     * 3.1. Pick a random user from the list of users
     * 3.2. Pick a random transaction amount to deposit in the user's account
     * 3.3. Add the transaction to the database.
     */
    async simulateDeposits() {
        let users = await mongoHelper.getUsers();
        let i = 0;
        let transactions = this.getRandomInt(0, 9999);
        while (i < transactions) {
            let idx = this.getRandomInt(0, (users.length - 1));
            let amount = this.getRandomInt(MIN_DEPOSIT_AMOUNT, MAX_DEPOSIT_AMOUNT);
            let userId = mongo.ObjectId(users[idx]._id).toString();
            this.addDepositTransaction(userId, amount);
            i++;
        }
    }

    /**
     * The `simulateBuyTransactions` is designed to simulate a defined number of buy transactions for users
     * The logic implemented for this is as follows:
     * 1. Get a list of all users from the DB collection
     * 2. Pick a random number of transactions to simulate
     * 3. For each transaction:
     * 3.1. Pick a random user from the list of users
     * 3.2. Pick a stock from the defined list of stocks
     * 3.3. Get the quote price for the selected stock
     * 3.4. Add a transaction to the database collection with the stock price and a quantity for the trade
     */
    async simulateBuyTransactions() {
        let users = await mongoHelper.getUsers();

        let i = 0;
        let transactions = this.getRandomInt(0, 999);

        console.log(`transactions: ${transactions}`)
        while (i < transactions) {
            // pick random stock
            let idx = this.getRandomInt(0, (config.stocks.length - 1));
            let stock = config.stocks[idx];

            // get stock data from collection
            let stockData = (await this.getStockData(stock))[0];
            let price = stockData.quote['05. price'];
            console.log(`${stock} - ${price}`);


            let userIdx = this.getRandomInt(0, (users.length - 1));
            let userId = mongo.ObjectId(users[userIdx]._id).toString();

            let quantity = this.getRandomInt(0, 10);
            await this.addBuyTransaction(userId, stock, quantity, price);
            i++;
        }
    }

    /**
     * The `simulateSellTransactions` is the similar to the `simulateBuyTransactions` function in the sense that we sell stocks.
     * The difference in logic is that we fetch the buy transactions for a user (picked randomly) and trigger a sell transaction for that position.
     * Logic:
     * 1. Get a list of all users from the DB collection
     * 2. Pick a random number of transactions to simulate
     * 3. For each transaction:
     * 3.1. Pick a random user from the list of users
     * 3.2. Get a list of all buy transactions performed by the user
     * 3.3. For a randomly picked transaction, perform a sell transaction for the exact quantity with a variation in price
     */
    async simulateSellTransactions() {
        let users = await mongoHelper.getUsers();

        let i = 0;
        let transactions = this.getRandomInt(0, 999);

        console.log(`transactions: ${transactions}`)
        while (i < transactions) {
            let userIdx = this.getRandomInt(0, (users.length - 1));
            let userId = mongo.ObjectId(users[userIdx]._id).toString();

            let buyTransactions = await this.getBuyTransactions(userId);
            let obj = buyTransactions[0];
            if(buyTransactions.length == 0) {
                continue;
            }
            console.log(obj);
            if(this.getRandomInt(0, 1) == 0) {
                obj.price = obj.price * 0.9;
            } else {
                obj.price = obj.price * 1.1;
            }

            await this.addSellTransaction(userId, obj.symbol, obj.quantity, obj.price);

            i++;
        }
    }

    /**
     * Function to add deposits to user account
     * The amount and user id is added to the `deposit` collection.
     * The _id generated for the deposit is then stored in the transactions collection.
     * The transaction collection is a master collection for all types of transactions
    */
    async addDepositTransaction(userId, amount) {
        let depositResult = await mongoHelper.setData(
            Collection.DEPOSITS,
            { 'userId': userId, 'amount': amount },
            false
        );

        await mongoHelper.setData(Collection.TRANSACTIONS,
            {
                transactionId: mongo.ObjectId(depositResult.insertedId).toString(),
                transactionType: "deposit",
            },
            false,
        );
    }

    /**
     * Database write method to insert buy transaction in collections
     * @param {string} userId 
     * @param {string} stock 
     * @param {int} quantity 
     * @param {double} price 
     */
    async addBuyTransaction(userId, stock, quantity, price) {
        let buyResult = await mongoHelper.setData(
            Collection.BUY,
            {
                'userId': userId,
                'symbol': stock,
                'quantity': quantity,
                'price': price
            },
            false
        );
        
        await mongoHelper.setData(Collection.TRANSACTIONS,
            {
                transactionId: mongo.ObjectId(buyResult.insertedId).toString(),
                transactionType: "buy",
            },
            false,
        );
    }

    /**
     * Database write method to insert sell transaction in collections
     * @param {string} userId 
     * @param {string} stock 
     * @param {int} quantity 
     * @param {double} price 
     */
    async addSellTransaction(userId, stock, quantity, price) {
        let sellResult = await mongoHelper.setData(
            Collection.SELL,
            {
                'userId': userId,
                'symbol': stock,
                'quantity': quantity,
                'price': price
            }
        );

        await mongoHelper.setData(Collection.TRANSACTIONS,
            {
                transactionId: mongo.ObjectId(sellResult.insertedId).toString(),
                transactionType: "sell",
            },
            false,
        );
    }

    /**
     * 
     * @param {string} stock 
     * @returns {Array<Object>}
     */
    async getStockData(stock) {
        return await mongoHelper.getData(Collection.QUOTE, { symbol: stock });
    }

    /**
     * 
     * @param {string} userId 
     * @returns {Array<Object>}
     */
    async getBuyTransactions(userId) {
        return await mongoHelper.getData(Collection.BUY, {'userId': userId});
    }
}

const transactionController = new TransactionController();
module.exports = transactionController;