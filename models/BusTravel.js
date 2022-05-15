const mongoose = require("mongoose");

const busTravel = new mongoose.Schema({
  busID: {type: String},
  startTime: {type: String},
  conductorID: {type: String},
  smsUIDList: {type: Array, default: []},
  tripStatus: {type: String, default: "Started"}
});

module.exports = mongoose.model("BusTravel", busTravel);