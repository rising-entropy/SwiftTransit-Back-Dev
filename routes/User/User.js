const express = require("express");
const router = express.Router();
var jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

const AdminUser = require('../../models/AdminUser');
const Conductor = require('../../models/Conductor');
const User = require('../../models/User');

const JWT_SECRET = "qsmUaX4kKHFaZvQVFYLQh2GnTNrmj0H0gvnOUiKPIdVoLAbfIAN1gUNVZVsIvnuhSU3TFFI1b1PMKKPy6A0cc9zh5NQSCMnfZmkrPX54W9a9Tc0gHj3t4n3AxowTRKxTYf3z5cwt0TstGdRM3bhHCcRDLGBkLi0LOvJBXJNAlaQQj7JfSLzAvSDx0bvgtf0H1zZBBqpkqcIStlNVZaBQ6M4SBunnUkjnJFSFwyIzNQ0creaAfpHN8Uqf0egPtY01c"

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

router.get('/', async(req, res) => {
    let users = await User.find({})
    return res.status(200).json(users);
});

router.get('/user/:username', async(req, res) => {
    let username = req.params.username;
    let theData = await User.find({_id: username});
    if(theData.length == 0)
    {
        return res.status(404).json({
            message: "Username Does not Exist"
        });
    }
    return res.status(200).json(theData[0]);
});

router.delete('/user/:username', async(req, res) => {
    let username = req.params.username;
    let theData = await User.deleteMany({_id: username});
    return res.status(201).json({
        message: "Deleted Successfully!"
    });
});

router.get('/admin-user/:username', async(req, res) => {
    let username = req.params.username;
    let theData = await AdminUser.find({_id: username});
    if(theData.length === 0)
    {
        return res.status(404).json({
            message: "Invalid Username"
        });
    }
    return res.status(200).json(theData[0]);
});

router.get('/conductor-user/:username', async(req, res) => {
    let username = req.params.username;
    let theData = await Conductor.find({_id: username});
    if(theData.length === 0)
    {
        return res.status(404).json({
            message: "Invalid Username"
        });
    }
    return res.status(200).json(theData[0]);
});

module.exports = router;