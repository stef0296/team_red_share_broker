import React from "react";
import "../styles/Card.css";

function Watchlist_Card(props) {
  return (
    <div class="rightdiv">
      <div class="Cards_div">
        <div id="cardcomponentofnews" class="cardofnews">
          <div class="container">
            <p id="symbol">{props.symbol}</p>
            <p id="price">{props.price}</p>
            <p id="changepercent">{props.changepercent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchlist_Card;
