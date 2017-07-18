import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

const Nav = props => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" activeClassName="active" to="/">
            Github Battle
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav">
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/battle">
                Battle
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/popular">
                Popular
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
