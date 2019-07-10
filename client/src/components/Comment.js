import _ from "lodash";

import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import formFieldNames from "./formComponents/formFieldNames";
import formField from "./formComponents/formField";
import validateEmails from "../utils/validateEmails";
import CommentReview from "./CommentReview";

class Comment extends Component {
  state = { commentReview: false };

  renderFields() {
    if (this.state.commentReview) {
      return (
        <CommentReview
          onCancel={() => this.setState({ commentReview: false })}
        />
      );
    }
    return _.map(formFieldNames, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={formField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  // <form onSubmit={this.props.handleSubmit(this.props.onCommentSubmit)}>

  // onCommentSubmit() {
  //   this.setState({ commentReview: true });
  // }
  render() {
    const onCommentSubmit = () => {
      this.setState({ commentReview: true });
    };
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(onCommentSubmit)}>
          {this.renderFields()}
          <Link to="/comments/new" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.subject) {
    errors.subject = "Subject is required";
  }
  if (!values.body) {
    errors.body = "Body is required";
  }
  if (!values.recipients) {
    errors.recipients = "Email is required";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "commentForm",
  destroyOnUnmount: false
})(Comment);
