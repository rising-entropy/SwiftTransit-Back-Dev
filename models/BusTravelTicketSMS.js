const mongoose = require("mongoose");

const busTravelTicketSMS = new mongoose.Schema({
    busTravelID: {type: String},
    userPhoneNumber: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    source: {type: String},
    destination: {type: String},
    perTicketCost: {type: String},
});

module.exports = mongoose.model("BusTravelTicketSMS", busTravelTicketSMS);