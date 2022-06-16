import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import "../styles/Home.css";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import Watchlist_Card from "../components/Watchlist_Card";

function Home() {
  const [listnews, setlistnews] = useState([]);
  const [watchlist, setwatchlist] = useState([]);
  const [query, setQuery] = useState("");
  const [combo_val, setcombo_val] = useState("");


  useEffect(() => {
    async function fetchData() {
      let newsData = await Axios.get("http://localhost:4000/fetch-news");
      setlistnews(newsData.data);

      let watchlistData = await Axios.get("http://localhost:4000/get-watchlist");
      let data = watchlistData.data;


      for (let obj of data) {
        let check = typeof obj["quote"]["02. open"];
        if (check === "undefined") {
          obj["quote"]["02. open"] = "n/a";
        }
      }
      setwatchlist(data);
    }
    fetchData();
  }, []);

  return (
    <div className="maindiv">
      <div class="leftdiv">
        <input
          placeholder="Search Stocks by Symbol"
          onChange={(event) => setQuery(event.target.value)}
        />

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
                />
              </div>
            );
          })}
      </div>

      <div className="rightdiv">
        <div>
          <h3>News</h3>
          <select className="combobox" onChange={async (e) => {
            const selectedcomboval = e.target.value;
            setcombo_val(selectedcomboval);
            if (selectedcomboval === 'ALL') {
              let newsData = await Axios.get("http://localhost:4000/fetch-news");
              setlistnews(newsData.data);
              return;
            }

            let newsData = await Axios.get(`http://localhost:4000/fetch-ticker-news?ticker=${selectedcomboval}`)
            setlistnews(newsData.data);
          }}>
            <option value="ALL">ALL</option>
            <option value="AAPL">Apple</option>
            <option value="NKE">Nike</option>
            <option value="ABFRL">Adiya Birla</option>

          </select>
        

        </div>
        {listnews.map((news) => {
          return (
            <div>
              <Card
                title={news.title}
                url={news.url}
                summary={news.summary}
                source={news.source}
                ticker=''

              ></Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
