import React from "react";
import "../styles/Card.css";

function Watchlist_Card(props) {
  return (
    <div class="Cards_div">
      <div id="watchist" class="card">
        <div class="container">
          <h1 id="symbol" font-style={"bold"} alignment-item align="left">
            {props.symbol}{" "}
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <text id="price" class="pricec" align="right">
              {props.price}
            </text>
          </h1>
          <p1 id="tradingday" class="tradingday" align="left">
            {props.tradingday}
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <text id="percent" class="percent" align="right">
              {props.changepercent}
            </text>
          </p1>
        </div>
      </div>
    </div>
  );
}

export default Watchlist_Card;
