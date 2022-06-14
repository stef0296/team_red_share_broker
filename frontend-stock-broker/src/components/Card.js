import React from "react";
import "../styles/Card.css";

function Card(props) {
  return (
    <div class="rightdiv">
      <div class="Cards_div">
        <div id="cardcomponentofnews" class="cardofnews">
          <div class="container">
            <h3 id="newstitle">{props.title}</h3>
            <p id="actualnews">{props.url}</p>
            <p id="newssummary">{props.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
