const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const commentSchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  url: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  date: Date,
  lastResponded: Date
});

// Load the schema into the mongoose object
mongoose.model("comments", commentSchema);
