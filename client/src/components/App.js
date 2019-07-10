import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import Comment from "./Comment";
import Footer from "./Footer";
import Header from "./Header";
import "../App.css";
import * as actions from "../actions";

const Landing = () => <div>Landing</div>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/comments/new" component={Comment} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
