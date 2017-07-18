import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <section className="container">
        <div className="jumbotron">
          <h3>
            React Fundamental Course by Tyler Mcginnis<i className="em em-sunglasses" />
          </h3>
          <p>
            Search by Username to find out who has more stars.. and show popular
            repos by Languages.
          </p>
          <Link className="btn btn-primary" to="/battle">
            Battle
          </Link>
          &nbsp;
          <Link className="btn btn-success" to="/popular">
            Popular
          </Link>
        </div>
      </section>
    );
  }
}

export default Home;
