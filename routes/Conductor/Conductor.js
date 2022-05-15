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
    let conductors = await Conductor.find({})
    return res.status(200).json(conductors);
});

router.get('/conductor/:username', async(req, res) => {
    let username = req.params.username;
    let theData = await Conductor.find({_id: username});
    if(theData.length == 0)
    {
        return res.status(404).json({
            message: "Username Does not Exist"
        });
    }
    return res.status(200).json(theData[0]);
});

router.delete('/conductor/:username', async(req, res) => {
    let username = req.params.username;
    let theData = await Conductor.deleteMany({_id: username});
    return res.status(201).json({
        message: "Deleted Successfully!"
    });
});

module.exports = router;