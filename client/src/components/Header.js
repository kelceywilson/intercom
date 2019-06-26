import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import * as actions from "../actions";
import Payments from "./Payments";

class Header extends Component {
  // componentDidMount() {
  //   this.props.auth
  // }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "please wait";
      case false:
        return (
          <a className="App-link" href="/auth/google">
            Sign in with Google
          </a>
        );
      default:
        return [
          <li>
            <Payments />
          </li>,
          <li>
            <a className="App-link" href="/api/logout">
              Sign Out
            </a>
          </li>
        ];
    }
  }

  render() {
    console.log(this.props);

    // <li>Dashboard</li>
    // <li>Log in with Google</li>
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            href="#"
            className="brand-logo"
          >
            Intercom
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
