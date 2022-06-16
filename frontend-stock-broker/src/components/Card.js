import React from "react";
import "../styles/Card.css";


function Card(props) {
  return (
    <div className="rightdiv">
      <div className="Cards_div">
        <div id="cardcomponentofnews" className ="cardofnews">
          <div class="container">
            <p className="newstitle" id="newstitle">{props.title}</p>
            <label>Source: </label>
            <a className="actualnews" id="actualnews" target="_blank" href={props.url} >{props.url}</a>
       
          </div>
        </div>
      </div>
    </div>
  );
}



export default Card;
