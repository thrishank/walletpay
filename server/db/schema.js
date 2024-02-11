const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect(
  "mongodb+srv://thrishankkalluru16:BLuHxonFqKr755Om@cluster0.rxhivru.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    minLength: 5,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
    trime: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trime: true,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const user = mongoose.model("user", userSchema);

const accountsSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const account = mongoose.model("account", accountsSchema);
module.exports = {
  user,
  account,
};
