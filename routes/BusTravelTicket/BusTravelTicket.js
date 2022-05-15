const express = require("express");
const BusTravelTicketSmart = require("../../models/BusTravelTicketSmart");
const router = express.Router();

const BusTravelTicket = require('../../models/BusTravelTicketSmart');
const User = require("../../models/User");

/*
{
    busTravelID: {type: String},
    quantity: {type: String},
    isDayPass: {type: Boolean},
    price: {type: Number},
    source: {type: String},
    destination: {type: String},
    perTicketCost: {type: String},
    isWallet: {type: Boolean}
}
*/
router.post('/create-ticket-by-conductor', async(req, res) => {
    let body = req.body;
    body['isWallet'] = true
    // create an instance of the ticket by data of conductor
    let busTravelTicket = await BusTravelTicket.create(body);
    return res.status(201).json({
        message: "Created Successfully!",
        data: busTravelTicket,
        id: busTravelTicket['_id']
    });
});

/*
{
    busTravelID: {type: String},
    userID: {type: String},
    quantity: {type: String},
    isDayPass: {type: Boolean},
    price: {type: Number},
    source: {type: String},
    destination: {type: String},
    perTicketCost: {type: String},
    isWallet: {type: Boolean},
}
*/
router.post('/create-ticket-by-conductor-cash', async(req, res) => {
    let body = req.body;
    body['isWallet'] = false
    // create an instance of the ticket by data of conductor
    let busTravelTicket = await BusTravelTicket.create(body);
    return res.status(201).json({
        message: "Created Successfully!",
        data: busTravelTicket,
        id: busTravelTicket['_id']
    });
});

/*
{
    ticketID: "",
    userID: ""
}
*/
router.post('/complete-ticket-transaction-by-user', async(req, res) => {
    let body = req.body;
    let ticketID = body['ticketID']
    let userID = body['userID']
    // get instance of ticket
    let theTicketInstance = await BusTravelTicket.find({_id: ticketID})
    if(theTicketInstance.length === 0)
    {
        return res.status(404).json({
            message: "Ticket ID does not exist!"
        })
    }

    theTicketInstance = theTicketInstance[0];

    if(theTicketInstance['ticketStatus'] != 'In Progress')
    {
        return res.status(403).json({
            message: "Transaction Already Done"
        })
    }

    // check the user wallet balance
    let theUserInstance = await User.find({_id: userID});
    if(theUserInstance.length === 0)
    {
        return res.status(404).json({
            message: "User does not exist!"
        })
    }

    theUserInstance = theUserInstance[0]

    let theTotalPrice = theTicketInstance['price']
    let walletBalance = theUserInstance['wallet']

    if(walletBalance >= theTotalPrice)
    {
        // payment can be complete

        //remove that amount from Wallet
        walletBalance = walletBalance - theTotalPrice;
        let updatedUserInstance = await User.findOneAndUpdate({_id: userID}, {wallet: walletBalance});
        let updatedTicketInstance = await BusTravelTicket.findOneAndUpdate({_id: ticketID}, {ticketStatus: "Success", userID: userID});
        return res.status(201).json({
            message: "Ticket Booked Successfully!"
        })
    }
    else
    {
        let updatedTicketInstance = await BusTravelTicket.findOneAndUpdate({_id: ticketID}, {ticketStatus: "Failure"});
        return res.status(403).json({
            message: "Insufficient Wallet Balance"
        })
    }
});


/*
{
    ticketID: "",
    userID: ""
}
*/
router.post('/complete-ticket-transaction-by-user-cash', async(req, res) => {
    let body = req.body;
    let ticketID = body['ticketID']
    let userID = body['userID']
    // get instance of ticket
    let theTicketInstance = await BusTravelTicket.find({_id: ticketID})
    if(theTicketInstance.length === 0)
    {
        return res.status(404).json({
            message: "Ticket ID does not exist!"
        })
    }

    theTicketInstance = theTicketInstance[0];

    // check the user wallet balance
    let theUserInstance = await User.find({_id: userID});
    if(theUserInstance.length === 0)
    {
        return res.status(404).json({
            message: "User does not exist!"
        })
    }

    theUserInstance = theUserInstance[0]

    let updatedTicketInstance = await BusTravelTicket.findOneAndUpdate({_id: ticketID}, {ticketStatus: "Success", userID: userID});

    return res.status(201).json({
        message: "Ticket Booked Successfully!"
    });
});

/*
{
    smartTicketID: ""
}
*/
router.post('/validate-ticket', async(req, res) => {
    let body = req.body;
    let smartTicketID = body['smartTicketID'];
    
    let theTicket = await BusTravelTicketSmart.find({_id: smartTicketID, ticketStatus: "Success"});
    if(theTicket.length == 0)
    {
        return res.status(404).json({
            message: "Invalid Ticket"
        });
    }

    return res.status(201).json({
        message: "Valid Ticket"
    });

});

router.get('/tickets-of-user/:username', async(req, res) => {
    let username = req.params.username;
    let theTickets = await BusTravelTicketSmart.find({userID: username});
    return res.status(200).json(theTickets);
});



module.exports = router;