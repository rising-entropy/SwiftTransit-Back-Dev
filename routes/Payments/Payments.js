const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
const Razorpay = require("razorpay");
const shortid = require("shortid");
const Payment = require("../../models/Payment");
const User = require("../../models/User");

const razorpay = new Razorpay({
    key_id: "",
    key_secret: "",
});

router.post('/create-order', async(req, res) => {

    let body = req.body;
    let amount = body['amount']
    let userID = body['userID']
    amount *= 100

    var options = {
        amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: `order_rcptid_${shortid.generate()}`,
        notes: {
            userID
        }
    };
    razorpay.orders.create(options, function(err, order) {
        return res.status(201).json(order)
    });
});

/*
{
    userID: 
}
*/
router.post('/add-to-wallet', async(req, res) => {

    let body = req.body;
    let amount = body['amount'];
    let userID = body['userID'];

    let theUserInstance = await User.find({_id: userID});
    if(theUserInstance.length == 0)
    {
        return res.status(404).json({
            message: "Username Invalid"
        })
    }
    theUserInstance = theUserInstance[0];

    let theUserWallet = theUserInstance['wallet']
    theUserWallet += parseInt(amount)

    let updatedUserInstance = await User.findOneAndUpdate({_id: userID}, {wallet: parseInt(theUserWallet)})
    let newPayment = await Payment.create(body);

    return res.status(201).json({
        message: "Amount Added Successfully!"
    });
});

module.exports = router;
