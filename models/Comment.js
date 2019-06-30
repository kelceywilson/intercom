const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: String,
  url: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

// Load the schema into the mongoose object
mongoose.model("comments", commentSchema);
