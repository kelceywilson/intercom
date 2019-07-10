import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import formFieldNames from "./formComponents/formFieldNames";

const CommentReview = ({ onCancel, formValues }) => {
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
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.commentForm.values };
}

export default connect(mapStateToProps)(CommentReview);
