const express = require("express");
const router = express.Router();

const Vonage = require('@vonage/server-sdk')

const BusTravelTicketSMS = require('../../models/BusTravelTicketSMS');
const User = require("../../models/User");
const BusTravel = require("../../models/BusTravel");

const ShortUniqueId = require('short-unique-id')

const vonage = new Vonage({
    apiKey: "1b89a21e",
    apiSecret: "bf2hvEswsS29BDp4"
})

/*
{
    busTravelID: {type: String},
    userPhoneNumber: {type: String},
    quantity: {type: Number},
    isDayPass: {type: Boolean},
    price: {type: Number},
    source: {type: String},
    destination: {type: String},
    perTicketCost: {type: String},
}
*/

router.post('/purchase-ticket', async(req, res) => {
    let body = req.body;
    // create an instance of the ticket by data of conductor
    let busTravelTicket = await BusTravelTicketSMS.create(body);

    let theTravelInstance = await BusTravel.find({_id: body['busTravelID']})
    theTravelInstance = theTravelInstance[0]

    let theSmsUid = theTravelInstance['smsUIDList']

    const uid = new ShortUniqueId({ length: 6 });

    let requiredUID = ""

    while(true)
    {
        let theUID = uid().toLowerCase();
        if(!theSmsUid.includes(theUID))
        {
            requiredUID = theUID;
            break;
        }
    }

    theSmsUid.push(requiredUID)

    let updatedBusTravel = await BusTravel.findByIdAndUpdate({_id: body['busTravelID']}, {smsUIDList: theSmsUid});

    // send the SMS

    const from = "SwiftTrans"
    const to = '91'+body['userPhoneNumber']

    const text = `Ticket Booked Successfully for the Bus! Unique Code: ${requiredUID}`

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                return res.status(201).json({
                    message: "Booked Successfully!"
                })
            } else {
                console.log(responseData.messages[0]['error-text'])
                return res.status(202).json({
                    message: "Booked Successfully with no message!"
                })
            }
        }
    });
});

/*
{
    smsTicketID: "",
    travelID: ""
}
*/
router.post('/validate-ticket', async(req, res) => {
    let body = req.body;
    let smsTicketID = body['smsTicketID'];
    let travelID = body['travelID'];
    
    let theTicket = await BusTravel.find({_id: travelID});
    if(theTicket.length == 0)
    {
        return res.status(404).json({
            message: "Invalid Travel ID"
        });
    }

    theTicket = theTicket[0]

    let theUIDList = theTicket['smsUIDList']

    if(theUIDList.includes(smsTicketID))
    {
        return res.status(201).json({
            message: "Valid Ticket"
        });
    }

    return res.status(404).json({
        message: "Invalid Ticket"
    });
    
});

module.exports = router;