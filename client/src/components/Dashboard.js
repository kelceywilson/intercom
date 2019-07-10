import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>Dashboard</div>
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
