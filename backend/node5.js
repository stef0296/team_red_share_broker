import neo4j from 'neo4j-driver'
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoos from 'mongoose';
import { default as mongodb } from 'mongodb';
import ejs from 'ejs';
import readline from 'readline-sync';


let MongoClient = mongodb.MongoClient;

// MongoDB connection
mongoos.connect("mongodb+srv://node-api:1234@srh-adb-01.inyaq.mongodb.net/recomendation");

const ids = [];
const app = express();

app.set('view engine', ejs);
app.use(cors({
    origin: 'http://localhost:5500'
}));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Data Schema
const data_schema = new mongoos.Schema({
    stock_name: {
        type: String
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    sector: {
        type: String
    },
    Open: {
        type: Number
    },
    High: {
        type: Number
    },
    Low: {
        type: Number
    },
    Close: {
        type: Number
    },
    dividend: {
        type: Number
    },
    mc: {
        type: Number
    },
    rate: {
        type: Number
    },
    beta: {
        type: Number
    },

});

const Post = mongoos.model('Post', data_schema);

var s_symbol;
var country;
var sector;
var beta;
var dividend;
var rate;
var upper_range_r;
var upper_range_d;
var lower_range_r;

// Database Authentication
const user = 'neo4j'
const pswd = 'Ishita.1996'

// Create Driver
const driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic(user, pswd));

// Create Driver session
const session = driver.session();

async function display_recomendation() {
    // Parameters for the Query using User Input
    console.log("*****************************************************************");
    console.log("           R E C O M E N D A T I O N   E N G I N E");
    console.log("*****************************************************************");
    console.log("         Name of Stocks      Stock Symbol   Sector of Stock");
    console.log("*****************************************************************");
    console.log("1. American Eagle Outfitters Inc  (AEO)    - Consumer Cyclical");
    console.log(" ");
    console.log("2. YPB GROUP FPO                  (YPB.AX) - Industrials");
    console.log(" ");
    console.log("3. Moderna Inc                    (MRNA)   - Healthcare");
    console.log(" ");
    console.log("4. APA Corp                       (APA)    - Energy");
    console.log(" ");
    console.log("5. Apple Inc.                     (APPL)   - Technology");
    console.log(" ");
    console.log("6. Bank of California             (BANC)   - Financial Services");
    console.log(" ");
    console.log("7. Armada Hoffler Properties Inc  (AHH)    - Real Estate");
    console.log(" ");
    console.log("8. Nexstar Media Group Inc        (NXST)   - Communication Services");
    console.log(" ");
    console.log("9. Artesian Resources Corporation (ARTNA)  - Utilities");
    console.log(" ");
    console.log("10. Vista Gold Corporation        (VGZ.TO) - Basic Materials");
    console.log(" ");
    console.log("11. Molson Coors Beverage         (TAP)    - Consumer Defensive");
    console.log("*****************************************************************");
    console.log("Please enter the stock of your choice: ");
    let Selection = Number(readline.question());
    
    // Cases for generating inputs
    switch (Selection) {
        case 1:
            s_symbol = 'AEO '
            country = 'United States ';
            sector = 'Consumer Cyclical ';
            beta = ">";
            dividend = 0.72;
            rate = 2.082;
            upper_range_r = rate * 1.5;
            lower_range_r = rate * 0.2;
            upper_range_d = dividend + 1.5;
          break;
        case 2:
            s_symbol = 'YPB.AX '
            country = 'Australia ';
            sector = 'Industrials ';
            beta = "<";
            dividend = 0;
            rate = 0.634;
            upper_range_r = 1.7;
            lower_range_r = 0.2;
            upper_range_d = 2.0;
          break;
        case 3:
            s_symbol = 'MRNA '
            country = 'United States ';
            sector = 'Healthcare ';
            beta = ">";
            dividend = 0;
            upper_range_r = 2.5;
            lower_range_r = 0.2;
            upper_range_d = 2;
        break;
        case 4:
            s_symbol = 'APA '
            country = 'United States ';
            sector = 'Energy ';
            beta = ">";
            dividend = 0;
            upper_range_r = 2.5;
            lower_range_r = 0.5;
            upper_range_d = 2;
        break;
        case 5:
            s_symbol = 'AAPL '
            country = 'United States ';
            sector = 'Technology ';
            beta = ">";
            dividend = 0;
            upper_range_r = 3.5;
            lower_range_r = 0.5;
            upper_range_d = 2;
        break;
        case 6:
            s_symbol = 'BANC '
            country = 'United States ';
            sector = 'Financial Services ';
            beta = ">";
            dividend = 0;
            upper_range_r = 2;
            lower_range_r = 0.5;
            upper_range_d = 2.8;
        break;
        case 7:
            s_symbol = 'AHH '
            country = 'United States ';
            sector = 'Real Estate ';
            beta = "<";
            dividend = 0;
            upper_range_r = 5;
            lower_range_r = 1;
            upper_range_d = 3;
        break;
        case 8:
            s_symbol = 'NXST '
            country = 'United States ';
            sector = 'Communication Services ';
            beta = ">";
            dividend = 0;
            upper_range_r = 3.12;
            lower_range_r = 1.7;
            upper_range_d = 4;
        break;
        case 9:
            s_symbol = 'ARTNA '
            country = 'United States ';
            sector = 'Utilities ';
            beta = "<";
            dividend = 0;
            upper_range_r = 2;
            lower_range_r = 0;
            upper_range_d = 2.5;
        break;
        case 10:
            s_symbol = 'VGZ.TO '
            country = 'United States ';
            sector = 'Basic Materials ';
            beta = ">";
            dividend = 0;
            upper_range_r = 9;
            lower_range_r = 3;
            upper_range_d = 2;
        break;
        case 11:
            s_symbol = 'TAP '
            country = 'United States ';
            sector = 'Consumer Defensive ';
            beta = ">";
            dividend = 0;
            upper_range_r = 1.5;
            lower_range_r = 0;
            upper_range_d = 1.5;
        break;
        default:
          console.log("Please select a suitable option! (Enter number of the stock)");
    }

    const query = "LOAD CSV WITH HEADERS FROM 'file:///Stocks_Final_csv.csv' AS row WITH row WHERE " +
    "row.Sector = '" + sector + "' and " +
    "row.Country = '" + country + "' and " +
    "toFloat(row.Dividend) >=0.0 and toFloat(row.Dividend) < " + upper_range_d + 
    " and toFloat(row.Beta) " + beta + "1 and " +
    "toFloat(row.Rate) < " + upper_range_r + " and toFloat(row.Rate) > " + lower_range_r +
    " AND NOT (row.Symbol = '" + s_symbol + "') RETURN row ORDER BY row.Dividend DESC"

    // Running the Cypher query
    const cypher = query;
    let result = await session.run(cypher)
    for (let i = 0; i < result['records'].length; i++) {
        var stock_1 = result['records'][i]['_fields'][0]['Symbol'];
        ids.push(stock_1)
    }
    return [ids[0], ids[1], ids[2], result];

}


async function Update_DB() {
    try {
        var url = "mongodb+srv://node-api:1234@srh-adb-01.inyaq.mongodb.net/";
        // Connect to Mongo
        MongoClient.connect(url, function (error, client) {
            if (error) throw error;

            // Select database
            var dbo = client.db("recomendation");

            // Drop the collection
            dbo.collection("posts").drop(function (err, result) {
                if (err) throw err;
                if (result) console.log("Collection database successfully Updated!");
            });
        });
    
    } finally {
        await save1();
    }
}

async function save1() {
    try {
        const data = await display_recomendation();
        for(let i=0; i<3; i++)
        {
            var s_name = data[i].replace(/\s/g, '');
            
            // Fetching API data to get real time prices
            var query_string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + s_name + "&interval=5min&apikey=WFFUCUNJDVZ5WZ8Q";
            const val = await fetch(query_string);
            const response = await val.json();
            var result = data[3];
            var key = response['Meta Data']['3. Last Refreshed'];
            
            // Saving data to MongoDB
            const post = new Post({
                stock_name: response['Meta Data']['2. Symbol'],
                Open: response['Time Series (Daily)'][key]['1. open'],
                Close: response['Time Series (Daily)'][key]['4. close'],
                High: response['Time Series (Daily)'][key]['2. high'],
                Low: response['Time Series (Daily)'][key]['3. low'],
                sector:result['records'][i]['_fields'][0]['Sector'],
                mc:result['records'][i]['_fields'][0]['Market_Cap'],
                rate:result['records'][i]['_fields'][0]['Rate'],
                name: result['records'][i]['_fields'][0]['Name'],
                country:result['records'][i]['_fields'][0]['Country'],
                dividend:result['records'][i]['_fields'][0]['Dividend'],
                beta:result['records'][i]['_fields'][0]['Beta'],

            });
            post.save();
            
        }
    }
    finally {
        await UI();

    }
}

async function UI(){
    try {
    const data1 = await query_2();
    const data2 = await query_3();
    const data3 = await query_4();
    const data4 = await query_5();

    // Parameters to be passed to HTML
    var result1_11 = "Stock Name: " + data1['records'][0]['_fields'][0]['Symbol'];
    var result1_12 = "Dividend Rate: " + data1['records'][0]['_fields'][0]['Dividend'] + "%";
    var result1_13 = "Sector: " + data1['records'][0]['_fields'][0]['Sector'];
    var result1_14 = "Beta Value: " + data1['records'][0]['_fields'][0]['Beta'];

    var result2_11 = "Stock Name: " + data1['records'][1]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result2_12 = "Dividend Rate: " + data1['records'][1]['_fields'][0]['Dividend'] + "%";
    var result2_13 = "Sector: " + data1['records'][1]['_fields'][0]['Sector'];
    var result2_14 = "Beta Value: " + data1['records'][1]['_fields'][0]['Beta'];

    var result3_11 = "Stock Name: " + data1['records'][2]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result3_12 = "Dividend Rate: " + data1['records'][2]['_fields'][0]['Dividend'] + "%";
    var result3_13 = "Sector: " + data1['records'][2]['_fields'][0]['Sector'];
    var result3_14 = "Beta Value: " + data1['records'][2]['_fields'][0]['Beta'];

    var result1_21 = "Stock Name: " + data2['records'][0]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result1_22 = "Dividend Rate: " + data2['records'][0]['_fields'][0]['Dividend'] + "%";
    var result1_23 = "Sector: " + data2['records'][0]['_fields'][0]['Sector'];
    var result1_24 = "Beta Value: " + data2['records'][0]['_fields'][0]['Beta'];

    var result2_21 = "Stock Name: " + data2['records'][1]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result2_22 = "Dividend Rate: " + data2['records'][1]['_fields'][0]['Dividend'] + "%";
    var result2_23 = "Sector: " + data2['records'][1]['_fields'][0]['Sector'];
    var result2_24 = "Beta Value: " + data2['records'][1]['_fields'][0]['Beta'];

    var result3_21 = "Stock Name: " + data2['records'][2]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result3_22 = "Dividend Rate: " + data2['records'][2]['_fields'][0]['Dividend'] + "%";
    var result3_23 = "Sector: " + data2['records'][2]['_fields'][0]['Sector'];
    var result3_24 = "Beta Value: " + data2['records'][2]['_fields'][0]['Beta'];

    var result1_31 = "Stock Name: " + data3['records'][0]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result1_32 = "Dividend Rate: " + data3['records'][0]['_fields'][0]['Dividend'] + "%";
    var result1_33 = "Sector: " + data3['records'][0]['_fields'][0]['Sector'];
    var result1_34 = "Beta Value: " + data3['records'][0]['_fields'][0]['Beta'];

    var result2_31 = "Stock Name: " + data3['records'][1]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result2_32 = "Dividend Rate: " + data3['records'][1]['_fields'][0]['Dividend']+ "%";
    var result2_33 = "Sector: " + data3['records'][1]['_fields'][0]['Sector'];
    var result2_34 = "Beta Value: " + data3['records'][1]['_fields'][0]['Beta'];

    var result3_31 = "Stock Name: " + data3['records'][2]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result3_32 = "Dividend Rate: " + data3['records'][2]['_fields'][0]['Dividend']+ "%";
    var result3_33 = "Sector: " + data3['records'][2]['_fields'][0]['Sector'];
    var result3_34 = "Beta Value: " + data3['records'][2]['_fields'][0]['Beta'];

    var result1_41 = "Stock Name: " + data4['records'][0]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result1_42 = "Dividend Rate: " + data4['records'][0]['_fields'][0]['Dividend'] + "%";
    var result1_43 = "Sector: " + data4['records'][0]['_fields'][0]['Sector'];
    var result1_44 = "Beta Value: " + data4['records'][0]['_fields'][0]['Beta'];

    var result2_41 = "Stock Name: " + data4['records'][1]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result2_42 = "Dividend Rate: " + data4['records'][1]['_fields'][0]['Dividend']+ "%";
    var result2_43 = "Sector: " + data4['records'][1]['_fields'][0]['Sector'];
    var result2_44 = "Beta Value: " + data4['records'][1]['_fields'][0]['Beta'];

    var result3_41 = "Stock Name: " + data4['records'][2]['_fields'][0]['Symbol'].replace(/\s/g, '');
    var result3_42 = "Dividend Rate: " + data4['records'][2]['_fields'][0]['Dividend']+ "%";
    var result3_43 = "Sector: " + data4['records'][2]['_fields'][0]['Sector'];
    var result3_44 = "Beta Value: " + data4['records'][2]['_fields'][0]['Beta'];

    var url = "mongodb+srv://node-api:1234@srh-adb-01.inyaq.mongodb.net/";
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("recomendation");

        // Passing parameters to HTML
        dbo.collection("posts").find({}).toArray(function(err, result) {
          if (err) throw err;
            var s1_name = 'Recomended Stock Name: ' + result[0]['stock_name'];
            var valn1 = 'Full Name: ' + result[0]['name'];
            var val11 = 'Open Price: ' + result[0]['Open'] + '$';
            var val12 = 'High Price: ' + result[0]['High'] + '$';
            var val13 = 'Low Price: ' + result[0]['Low'] + '$';
            var val14 = 'Close Price: ' + result[0]['Close'] + '$';
            var val15 = 'Country: ' + result[0]['country'];
            var val16 = 'Sector: ' + result[0]['sector'];
            var val17 = 'Dividend Rate: ' + result[0]['dividend'] + '%';
            var val18 = 'Market Capital: ' + result[0]['mc'] + '$';
            var val19 = 'Current Ratio: ' + result[0]['rate'];
            var val20 = 'Beta Value: ' + result[0]['beta'];
    
            var s2_name = 'Recomended Stock Name: ' + result[1]['stock_name'];
            var valn2 = 'Full Name: ' + result[1]['name'];
            var val21 = 'Open Price: ' + result[1]['Open'] + '$';
            var val22 = 'High Price: ' + result[1]['High'] + '$';
            var val23 = 'Low Price: ' + result[1]['Low'] + '$';
            var val24 = 'Close Price: ' + result[1]['Close'] + '$';
            var val25 = 'Country: ' + result[1]['country'];
            var val26 = 'Sector: ' + result[1]['sector'];
            var val27 = 'Dividend Rate: ' + result[1]['dividend'] + '%';
            var val28 = 'Market Capital: ' + result[1]['mc'] + '$';
            var val29 = 'Current Ratio: ' + result[1]['rate'];
            var val30 = 'Beta Value: ' + result[1]['beta'];

            var s3_name = 'Recomended Stock Name: ' + result[2]['stock_name'];
            var valn3 = 'Full Name: ' + result[2]['name'];
            var val31 = 'Open Price: ' + result[2]['Open'] + '$';
            var val32 = 'High Price: ' + result[2]['High'] + '$';
            var val33 = 'Low Price: ' + result[2]['Low'] + '$';
            var val34 = 'Close Price: ' + result[2]['Close'] + '$';
            var val35 = 'Country: ' + result[2]['country'];
            var val36 = 'Sector: ' + result[2]['sector'];
            var val37 = 'Dividend Rate: ' + result[2]['dividend']+ '%';
            var val38 = 'Market Capital: ' + result[2]['mc'] + '$';
            var val39 = 'Current Ratio: ' + result[2]['rate'];
            var val40 = 'Beta Value: ' + result[2]['beta'];
            db.close();
        
            app.get('/', (req, res) =>{
                
                res.render('/Users/ishitakhare/Desktop/Test/views/value.ejs',{
                    Recommended_Stock_1: s1_name,
                    Open1: val11,
                    Name1: valn1,
                    High1: val12,
                    Low1: val13,
                    Close1: val14,
                    country1: val15,
                    sector1: val16,
                    dividend1: val17,
                    mc1: val18,
                    rate1: val19,
                    beta1: val20,

                    Recommended_Stock_2: s2_name,
                    Name2: valn2,
                    Open2: val21,
                    High2: val22,
                    Low2: val23,
                    Close2: val24,
                    country2: val25,
                    sector2: val26,
                    dividend2: val27,
                    mc2: val28,
                    rate2: val29,
                    beta2: val30,

                    Recommended_Stock_3: s3_name,
                    Name3: valn3,
                    Open3: val31,
                    High3: val32,
                    Low3: val33,
                    Close3: val34,
                    country3: val35,
                    sector3: val36,
                    dividend3: val37,
                    mc3: val38,
                    rate3: val39,
                    beta3: val40,

                    res1_1: result1_11,
                    res1_2: result1_12,
                    res1_3: result1_13,
                    res1_4: result1_14,

                    res2_1: result2_11,
                    res2_2: result2_12,
                    res2_3: result2_13,
                    res2_4: result2_14,

                    res3_1: result3_11,
                    res3_2: result3_12,
                    res3_3: result3_13,
                    res3_4: result3_14,

                    res11_1: result1_21,
                    res11_2: result1_22,
                    res11_3: result1_23,
                    res11_4: result1_24,

                    res22_1: result2_21,
                    res22_2: result2_22,
                    res22_3: result2_23,
                    res22_4: result2_24,

                    res33_1: result3_21,
                    res33_2: result3_22,
                    res33_3: result3_23,
                    res33_4: result3_24,
                
                    res111_1: result1_31,
                    res111_2: result1_32,
                    res111_3: result1_33,
                    res111_4: result1_34,

                    res222_1: result2_31,
                    res222_2: result2_32,
                    res222_3: result2_33,
                    res222_4: result2_34,

                    res333_1: result3_31,
                    res333_2: result3_32,
                    res333_3: result3_33,
                    res333_4: result3_34,

                    res1111_1: result1_41,
                    res1111_2: result1_42,
                    res1111_3: result1_43,
                    res1111_4: result1_44,

                    res2222_1: result2_41,
                    res2222_2: result2_42,
                    res2222_3: result2_43,
                    res2222_4: result2_44,

                    res3333_1: result3_41,
                    res3333_2: result3_42,
                    res3333_3: result3_43,
                    res3333_4: result3_44,
                    
                });
            })
            
            app.listen(8000, function(){

                // Displaying values on localhost:8000
                console.log("Results Displayed on the Server");
            })
        
        });

    });
    }
    finally {
        console.log("Recomendations Generated...");

    }
}

async function query_2() {
    // Parameters for the Query

    const query = "LOAD CSV WITH HEADERS FROM 'file:///Stocks_Final_csv.csv' AS row RETURN row ORDER BY row.Dividend DESC LIMIT 3";

    // Running the Cypher query
    const cypher = query;
    let result = await session.run(cypher)
    return result;

}
async function query_3() {
    // Parameters for the Query

    const query = "LOAD CSV WITH HEADERS FROM 'file:///Stocks_Final_csv.csv' AS row WITH row WHERE toInteger(row.Beta) > 1 RETURN row ORDER BY row.Dividend DESC LIMIT 4";

    // Running the Cypher query
    const cypher = query;
    let result = await session.run(cypher)
    return result;
}

async function query_4() {
    // Parameters for the Query

    const query = "LOAD CSV WITH HEADERS FROM 'file:///Stocks_Final_csv.csv' AS row WITH row WHERE toInteger(row.Beta) < 1 RETURN row ORDER BY row.Dividend DESC LIMIT 4";

    // Running the Cypher query
    const cypher = query;
    let result = await session.run(cypher)
    return result;
}

async function query_5() {
    // Parameters for the Query

    const query = "LOAD CSV WITH HEADERS FROM 'file:///Stocks_Final_csv.csv' AS row WITH row WHERE toInteger(row.Market_Cap) > 10000000000 RETURN row ORDER BY row.Dividend DESC LIMIT 3";

    // Running the Cypher query
    const cypher = query;
    let result = await session.run(cypher)
    return result;
}

// Calling the main function
Update_DB();
