const mongoose = require("mongoose");

const adminUser = new mongoose.Schema({
  _id: {type: String},
  password: {type: String},
  name: {type: String},
  email: {type: String},
  phoneNumber: {type: String}
});

module.exports = mongoose.model("AdminUser", adminUser);