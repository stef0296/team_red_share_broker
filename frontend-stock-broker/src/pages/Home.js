import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Watchlist_Card from "../components/Watchlist_Card";

function Home() {
  const [listnews, setlistnews] = useState([]);
  const [watchlist, setwatchlist] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:4000/fetch-news").then((response) => {
      setlistnews(response.data);
    });
    Axios.get("http://localhost:4000/get-watchlist").then((response) => {
      let data = response.data;

      for (let obj of data) {
        let check = typeof obj["quote"]["02. open"];
        if (check === "undefined") {
          obj["quote"]["02. open"] = "n/a";
        }
      }
      setwatchlist(data);
    });
  }, []);

  return (
    <div className="maindiv">
      <div class="leftdiv">
        <h1>Watchlist</h1>
        <input
          align="left"
          class="tb_search"
          width={100}
          placeholder="Search Stocks by Symbol"
          onChange={(event) => setQuery(event.target.value)}
        />{" "}
        <br></br>
        <br></br> <br></br>
        {watchlist
          .filter((watch) => {
            if (query === "") {
              return watch;
            } else if (
              watch.symbol.toLowerCase().includes(query.toLowerCase())
            ) {
              return watch;
            }
          })
          .map((watch, index) => {
            return (
              <div key={index}>
                <Watchlist_Card
                  symbol={watch.symbol}
                  open={watch["quote"]["02. open"]}
                  price={watch["quote"]["05. price"]}
                  changepercent={watch["quote"]["10. change percent"]}
                  tradingday={watch["quote"]["07. latest trading day"]}
                />
              </div>
            );
          })}
      </div>

      <div className="rightdiv">
        {listnews.map((news) => {
          return (
            <div>
              <Card
                title={news.title}
                url={news.url}
                summary={news.summary}
              ></Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
