const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

const AdminUser = require('../../models/AdminUser');
const Conductor = require('../../models/Conductor');
const User = require('../../models/User');
const JWT_SECRET = ""
function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

router.post('/', async(req, res) => {
 
    let body = req.body;

    let username = body['username'];
    let password = body['password'];
    let conductorLicenseNumber = body['conductorLicenseNumber']

    password = hash(password);

    // if username exists

    let theUser = await Conductor.find({_id: username})
    if(theUser.length != 0)
    {
        return res.status(404).json({
            message: "Username already exists!"
        })
    }

    theUser = await Conductor.find({conductorLicenseNumber})
    if(theUser.length != 0)
    {
        return res.status(404).json({
            message: "Conductor License Number already exists!"
        })
    }

    let data = {
        _id: username,
        password,
        name: body['name'],
        email: body['email'],
        phoneNumber: body['phoneNumber'],
        conductorLicenseNumber: body['conductorLicenseNumber']
    }

    let newUser = await Conductor.create(data);

    return res.status(201).json({
        message: "Created Successfully!",
    });
});

module.exports = router;
