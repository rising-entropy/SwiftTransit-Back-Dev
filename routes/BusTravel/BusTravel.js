const express = require("express");
const Bus = require("../../models/Bus");
const router = express.Router();

const BusTravel = require('../../models/BusTravel');
const BusTravelTicketSmart = require("../../models/BusTravelTicketSmart");
const BusTravelTicketSMS = require("../../models/BusTravelTicketSMS");

router.post('/', async(req, res) => {
    let body = req.body;
    let busTravel = await BusTravel.create({
        busID: body['busID'],
        startTime: body['startTime'],
        conductorID: body['conductorID']
    });
    return res.status(201).json({
        message: "Created Successfully!",
        data: busTravel
    });
});

router.get('/', async(req, res) => {
    let busTravel = await BusTravel.find({});
    return res.status(200).json(busTravel);
});

router.get('/bustravel/:id', async(req, res) => {
    let id = req.params.id
    let busTravel = await BusTravel.find({_id: id});
    if(busTravel.length == 0)
    {
        return res.status(404).json({
            message: "ID does not exist"
        });
    }
    return res.status(200).json(busTravel[0]);
});

router.delete('/bustravel/:id', async(req, res) => {
    let id = req.params.id
    let busTravel = await BusTravel.deleteMany({_id: id});
    return res.status(201).json({
        message: "Deleted Successfully!"
    });
});

router.get('/conductor/:username', async(req, res) => {
    let username = req.params.username
    let busTravel = await BusTravel.find({conductorID: username});
    return res.status(200).json(busTravel);
});

router.post('/bus-travel/end-trip/:id', async(req, res) => {
    let updatedTrip = await BusTravel.findOneAndUpdate({_id: req.params.id}, {tripStatus: "Ended"});
    return res.status(201).json({
        message: "Trip Ended Successfully!"
    });
});

router.get('/all-details/:id', async(req, res) => {
    let id = req.params.id
    let reqResp = {}
    let busTravel = await BusTravel.find({_id: id});
    if(busTravel.length == 0)
    {
        return res.status(404).json({
            message: "ID does not exist"
        });
    }

    reqResp['travelData'] = busTravel[0]

    let tickets = await BusTravelTicketSmart.find({busTravelID: id});
    reqResp['smartTickets'] = tickets

    tickets = await BusTravelTicketSMS.find({busTravelID: id});
    reqResp['smsTickets'] = tickets

    return res.status(200).json(reqResp);
});

router.get('/bus-details/:id', async(req, res) => {
    let id = req.params.id
    let busTravel = await BusTravel.find({_id: id});
    if(busTravel.length == 0)
    {
        return res.status(404).json({
            message: "ID does not exist"
        });
    }
    busTravel = busTravel[0]

    let theBusDetails = await Bus.find({_id: busTravel['busID']})

    return res.status(200).json(theBusDetails[0]);
});

module.exports = router;