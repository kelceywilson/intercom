import React, { Component } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>Dashboard</div>
        <Comments />
        <div className="fixed-action-btn">
          <Link to="/comments/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
