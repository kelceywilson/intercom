const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

// Load the schema into the mongoose object
mongoose.model("users", userSchema);
