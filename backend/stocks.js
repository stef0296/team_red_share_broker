const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  Symbol: {
    type: String,
  },
  AssetType: {
    type: String,
  },
  Name: {
    type: String,
  },
  Description: {
    type: String,
  },
  CIK: {
    type: String,
  },
  Exchange: {
    type: String,
  },
  Currency: {
    type: String,
  },
  Country: {
    type: String,
  },
  Sector: {
    type: String,
  },
  Industry: {
    type: String,
  },
  Address: {
    type: String,
  },
  FiscalYearEnd: {
    type: String,
  },
  LatestQuarter: {
    type: String,
  },
  MarketCapitalization: {
    type: String,
  },
  EBITDA: {
    type: String,
  },
  PERatio: {
    type: String,
  },
  PEGRatio: {
    type: String,
  },
  BookValue: {
    type: String,
  },
  DividendPerShare: {
    type: String,
  },
  DividendYield: {
    type: String,
  },
  EPS: {
    type: String,
  },
  RevenuePerShareTTM: {
    type: String,
  },
  ProfitMargin: {
    type: String,
  },
  OperatingMarginTTM: {
    type: String,
  },
  ReturnOnAssetsTTM: {
    type: String,
  },
  ReturnOnEquityTTM: {
    type: String,
  },
  RevenueTTM: {
    type: String,
  },
  GrossProfitTTM: {
    type: String,
  },
  DilutedEPSTTM: {
    type: String,
  },
  QuarterlyEarningsGrowthYOY: {
    type: String,
  },
  QuarterlyRevenueGrowthYOY: {
    type: String,
  },
  AnalystTargetPrice: {
    type: String,
  },
  TrailingPE: {
    type: String,
  },
  ForwardPE: {
    type: String,
  },
  PriceToSalesRatioTTM: {
    type: String,
  },
  PriceToBookRatio: {
    type: String,
  },
  EVToRevenue: {
    type: String,
  },
  EVToEBITDA: {
    type: String,
  },
  Beta: {
    type: String,
  },
  SharesOutstanding: {
    type: String,
  },
  DividendDate: {
    type: String,
  },
  ExDividendDate: {
    type: String,
  },
  
});

const StockModel = mongoose.model("stocks",stockSchema);
module.exports = StockModel;