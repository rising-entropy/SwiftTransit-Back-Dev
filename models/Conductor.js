const mongoose = require("mongoose");

const conductor = new mongoose.Schema({
  _id: {type: String},
  password: {type: String},
  name: {type: String},
  phoneNumber: {type: String},
  conductorLicenseNumber: {type: String, unique: true}
});

module.exports = mongoose.model("Conductor", conductor);