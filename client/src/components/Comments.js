import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchComments } from "../actions";

class Comments extends Component {
  componentDidMount() {
    this.props.fetchComments();
  }

  renderComments() {
    return this.props.comments.reverse().map(comment => {
      return (
        <div className="card darken-1" key={comment._id}>
          <div className="card-content">
            <span className="card-title">{comment.title}</span>
            <p>{comment.body}</p>
            <p className="right">
              Sent On: {new Date(comment.date).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <div>Yes: {comment.yes}</div>
            <div>No: {comment.no}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderComments()}</div>;
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}
export default connect(
  mapStateToProps,
  { fetchComments }
)(Comments);
