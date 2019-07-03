const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String
    // required: true,
    // unique: true
  },
  password: {
    type: String
    // required: true
  },
  fullName: String,
  githubId: String,
  facebookId: String,
  role: {
    type: String,
    enum: ["user", "moderator"]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
