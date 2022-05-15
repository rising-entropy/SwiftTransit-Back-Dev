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
    let hashedPassword = hash(password);

    // if username exists

    let theUser = await Conductor.find({_id: username})
    if(theUser.length == 0)
    {
        return res.status(404).json({
            message: "Username does not exist!"
        })
    }

    theUser = theUser[0]
    if(theUser['password'] != hashedPassword)
    {
        return res.status(404).json({
            message: "Password invalid!"
        })
    }

    delete theUser['password']

    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 100),
        data: {data: theUser, role: 'conductor'}
      }, JWT_SECRET);


    return res.status(201).json({
        message: "Login Successful",
        token
    });
});

module.exports = router;
