const mongoose = require("mongoose");

const payment = new mongoose.Schema({
  userID: {type: String},
  amount: {type: Number},
  razorpay_payment_id: {type: String},
  razorpay_order_id: {type: String},
  razorpay_signature: {type: String},
});

module.exports = mongoose.model("Payment", payment);