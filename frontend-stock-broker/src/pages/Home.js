import { Link } from "react-router-dom";
import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import "../styles/Home.css";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Watchlist_Card from "../components/Watchlist_Card";

function Home() {
  // const fetchUsers = async () => {
  //   console.log("hello");
  //   let response = await Axios.get("http://localhost:4000/fetch-news");
  //   const newd = response.data;
  //   console.log(newd);
  // };

  // fetchUsers();
  const [listnews, setlistnews] = useState([]);
  const [watchlist, setwatchlist] = useState([]);

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
        <div class="SearchDiv">
          <input class="tb_search" placeholder="Enter Stock Name"></input>
          <Button class="btn_search">Search</Button>
        </div>
        {watchlist.map((watch) => {
          return (
            <div>
              <Watchlist_Card
                symbol={watch.symbol}
                open={watch["quote"]["02. open"]}
                price={watch["quote"]["05. price"]}
                changepercent={watch["quote"]["10. change percent"]}
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
