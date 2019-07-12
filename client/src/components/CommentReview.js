import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFieldNames from "./formComponents/formFieldNames";
import * as actions from "../actions";

const CommentReview = ({ onCancel, formValues, submitComment, history }) => {
  const fields = _.map(formFieldNames, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <div>CommentReview</div>
      <div>{fields}</div>
      <button onClick={onCancel}>Back</button>
      <button
        className="green btn-flat right"
        onClick={() => submitComment(formValues, history)}
      >
        Send Comment
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.commentForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(CommentReview));
