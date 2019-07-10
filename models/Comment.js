const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const commentSchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  url: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date
});

// Load the schema into the mongoose object
mongoose.model("comments", commentSchema);
