const mongoose = require("mongoose");

const busTravelTicketSmart = new mongoose.Schema({
    busTravelID: {type: String},
    userID: {type: String},
    quantity: {type: Number},
    isDayPass: {type: Boolean},
    price: {type: Number},
    source: {type: String},
    destination: {type: String},
    perTicketCost: {type: String},
    isWallet: {type: Boolean},
    ticketStatus: {type: String, default: "In Progress"},
});

module.exports = mongoose.model("BusTravelTicketSmart", busTravelTicketSmart);