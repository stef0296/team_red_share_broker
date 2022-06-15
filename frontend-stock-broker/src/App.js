import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

//import Footer from "./components/Footer";
import Menu from "./pages/Menu";
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
          <Route path="/menu" exact component={Menu} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
