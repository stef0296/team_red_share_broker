const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const StockModel = require("../models/stocks");
const axios = require("axios");
const _ = require("lodash");
const { response } = require("express");

const app = express();
mongoose
  .connect(
    "mongodb+srv://node-api:1234@srh-adb-01.inyaq.mongodb.net/db01?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database not connected" + err);
  });

router.post("/", async (req, res) => {
  const kword = req.body.kword;
  console.log(kword);

  try {
    // const response = await axios.get(
    //   `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${kword}&apikey=ORFSBUQ3L0MBWU3T`
    // );
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${kword}&apikey=ORFSBUQ3L0MBWU3T`
    );
    if (response && response.data) {
      var stockModel = new StockModel();

      stockModel.Symbol = response.data.Symbol;
      stockModel.AssetType = response.data.AssetType;
      stockModel.Name = response.data.Name;
      stockModel.Description = response.data.Description;
      stockModel.CIK = response.data.CIK;
      stockModel.Exchange = response.data.Exchange;
      stockModel.Currency = response.data.Currency;
      stockModel.Country = response.data.Country;
      stockModel.Sector = response.data.Sector;
      stockModel.Industry = response.data.Industry;
      stockModel.Address = response.data.Address;
      stockModel.FiscalYearEnd = response.data.FiscalYearEnd;
      stockModel.LatestQuarter = response.data.LatestQuarter;
      stockModel.MarketCapitalization = response.data.MarketCapitalization;
      stockModel.EBITDA = response.data.EBITDA;
      stockModel.PERatio = response.data.PERatio;
      stockModel.PEGRatio = response.data.PEGRatio;
      stockModel.BookValue = response.data.BookValue;
      stockModel.DividendPerShare = response.data.DividendPerShare;
      stockModel.DividendYield = response.data.DividendYield;
      stockModel.EPS = response.data.EPS;
      stockModel.RevenuePerShareTTM = response.data.RevenuePerShareTTM;
      stockModel.ProfitMargin = response.data.ProfitMargin;
      stockModel.OperatingMarginTTM = response.data.OperatingMarginTTM;
      stockModel.ReturnOnAssetsTTM = response.data.ReturnOnAssetsTTM;
      stockModel.ReturnOnEquityTTM = response.data.ReturnOnEquityTTM;
      stockModel.RevenueTTM = response.data.RevenueTTM;
      stockModel.GrossProfitTTM = response.data.GrossProfitTTM;
      stockModel.DilutedEPSTTM = response.data.DilutedEPSTTM;
      stockModel.QuarterlyEarningsGrowthYOY =
        response.data.QuarterlyEarningsGrowthYOY;
      stockModel.QuarterlyRevenueGrowthYOY =
        response.data.QuarterlyRevenueGrowthYOY;
      stockModel.AnalystTargetPrice = response.data.AnalystTargetPrice;
      stockModel.TrailingPE = response.data.TrailingPE;
      stockModel.ForwardPE = response.data.ForwardPE;
      stockModel.PriceToSalesRatioTTM = response.data.PriceToSalesRatioTTM;
      stockModel.PriceToBookRatio = response.data.PriceToBookRatio;
      stockModel.EVToRevenue = response.data.EVToRevenue;
      stockModel.EVToEBITDA = response.data.EVToEBITDA;
      stockModel.Beta = response.data.Beta;
      stockModel.SharesOutstanding = response.data.SharesOutstanding;
      stockModel.DividendDate = response.data.DividendDate;
      stockModel.ExDividendDate = response.data.ExDividendDate;

      stockModel.save((err, data) => {
        if (err) {
          console.error(err);
        } else {
          //res.status(200).send({"msg":"Inserted to DB"})
          res.status(200).send(stockModel);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send("Data is not available.");
  }
});

router.get("/", async (req, res) => {
  const kword = req.body.kword;
  console.log(kword);
  const query = { Symbol: `${kword}` };
  try {
    const stockOverview = await StockModel.find(query);
    console.log(stockOverview);
    res.json(stockOverview);
  } catch (err) {
    res.send("Error", err);
  }
});

module.exports = router;
