import { useState, useEffect } from "react";
import Axios from "axios";

function Search() {
  const [listofstocks, setListofstocks] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:5001/stock").then((response) => {
      setListofstocks(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="search-stocks">
        <h1>Search Stocks</h1>
      </div>
    </div>
  );
}

export default Search;
