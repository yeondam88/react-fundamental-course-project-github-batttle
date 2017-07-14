import React, { Component } from "react";
import Popular from "./Popular";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/popular" component={Popular} />
        </div>
      </Router>
    );
  }
}

export default App;
