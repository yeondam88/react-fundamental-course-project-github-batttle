import React, { Component } from "react";
import { battle } from "../utils/api";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";

const queryString = require("query-string");

const Profile = props => {
  let info = props.info;
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className="list-group card--item">
        {info.name &&
          <li className="list-group-item">
            Name: {info.name}
          </li>}
        {info.location &&
          <li className="list-group-item">
            Location: {info.location}
          </li>}

        {info.company &&
          <li className="list-group-item">
            Company: {info.company}
          </li>}
        <li className="list-group-item">
          Followers: <span className="badge">{info.followers}</span>
        </li>
        <li className="list-group-item">
          Following: <span className="badge">{info.following}</span>
        </li>
        <li className="list-group-item">
          Public Repos: <span className="badge">{info.public_repos}</span>
        </li>
        {info.blog &&
          <li className="list-group-item">
            <a href={info.blog}>
              {info.blog}
            </a>
          </li>}
      </ul>
    </PlayerPreview>
  );
};

const Player = props => {
  return (
    <div>
      <h1 className="header">
        {props.label}{" "}
        {props.label === "Winner"
          ? <i className="em em-tada" />
          : <i className="em em-tired_face" />}
      </h1>
      <h3 style={{ textAlign: "center" }}>
        Score: {props.score}
      </h3>
      <Profile info={props.profile} />
    </div>
  );
};

Player.propTypes = {
  label: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    battle([players.playerOneName, players.playerTwoName]).then(results => {
      if (results === null) {
        return this.setState(() => {
          return {
            error:
              "Looks like there was error. Check that both users exist on Github.",
            loading: false
          };
        });
      }

      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        };
      });
    });
  }

  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>
            {error}
          </p>
          <Link to="/battle">Battle</Link>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="card">
          <Player
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
        </div>
        <div className="card">
          <Player label="Loser" score={loser.score} profile={loser.profile} />
        </div>
      </div>
    );
  }
}

export default Results;
