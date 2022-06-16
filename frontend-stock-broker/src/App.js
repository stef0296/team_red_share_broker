import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

//import Footer from "./components/Footer";

import Search from "./pages/Search";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/users" exact component={Search} />
      
        </Switch>
      </Router>
    </div>
  );
}

export default App;
