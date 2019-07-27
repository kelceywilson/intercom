import axios from "axios";

export const FETCH_USER = "FETCH_USER";
export const FETCH_COMMENTS = "FETCH_COMMENTS";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  return dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  return dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchComments = () => async dispatch => {
  const res = await axios.get("/api/comments");

  dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const submitComment = (values, history) => async dispatch => {
  const res = await axios.post("/api/comments", values);

  history.push("/dashboard");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteComment = id => async dispatch => {
  console.log("delete comment", id);

  const res = await axios.delete("/api/comments", { data: { id: id } });

  dispatch({ type: FETCH_COMMENTS, payload: res.data });
};
