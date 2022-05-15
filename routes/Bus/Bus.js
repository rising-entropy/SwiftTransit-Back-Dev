let BUS_DATA = [
    {
        "routeNo": "123",
        "source": "Pune Manapa Bus Station",
        "destination": "Bhakti Shakti",
        "ticketPrices": [
            {
                "stop1": "Pune Manapa Bus Station",
                "stop2": "Shimla Office",
                "cost": 10
            },
            {
                "stop1": "Pune Manapa Bus Station",
                "stop2": "Wakdewadi",
                "cost": 15
            },
            {
                "stop1": "Pune Manapa Bus Station",
                "stop2": "Khadki Railway Station",
                "cost": 20
            },
            {
                "stop1": "Pune Manapa Bus Station",
                "stop2": "Pimpri",
                "cost": 25
            },
            {
                "stop1": "Pune Manapa Bus Station",
                "stop2": "Bhakti Shakti",
                "cost": 30
            },
            {
                "stop1": "Shimla Office",
                "stop2": "Wakdewadi",
                "cost": 10
            },
            {
                "stop1": "Shimla Office",
                "stop2": "Khadki Railway Station",
                "cost": 15
            },
            {
                "stop1": "Shimla Office",
                "stop2": "Pimpri",
                "cost": 20
            },
            {
                "stop1": "Shimla Office",
                "stop2": "Bhakti Shakti",
                "cost": 25
            },
            {
                "stop1": "Wakdewadi",
                "stop2": "Khadki Railway Station",
                "cost": 10
            },
            {
                "stop1": "Wakdewadi",
                "stop2": "Pimpri",
                "cost": 15
            },
            {
                "stop1": "Wakdewadi",
                "stop2": "Bhakti Shakti",
                "cost": 25
            },
            {
                "stop1": "Khadki Railway Station",
                "stop2": "Pimpri",
                "cost": 15
            },
            {
                "stop1": "Khadki Railway Station",
                "stop2": "Bhakti Shakti",
                "cost": 20
            },
            {
                "stop1": "Pimpri",
                "stop2": "Bhakti Shakti",
                "cost": 10
            }
        ],
        "stops": [
            "Pune Manapa Bus Station", "Shimla Office", "Wakdewadi", "Khadki Railway Station", "Pimpri", "Bhakti Shakti"
        ]
    },
    {
        "routeNo": "336",
        "source": "Bhakti Shakti",
        "destination": "Wagholi",
        "ticketPrices": [
            {
                "stop1": "Bhakti Shakti",
                "stop2": "Pimpri",
                "cost": 10
            },
            {
                "stop1": "Bhakti Shakti",
                "stop2": "Dapodi",
                "cost": 20
            },
            {
                "stop1": "Bhakti Shakti",
                "stop2": "Deccan College",
                "cost": 25
            },
            {
                "stop1": "Bhakti Shakti",
                "stop2": "Yerwada",
                "cost": 35
            },
            {
                "stop1": "Bhakti Shakti",
                "stop2": "Wagholi",
                "cost": 45
            },
            {
                "stop1": "Pimpri",
                "stop2": "Dapodi",
                "cost": 10
            },
            {
                "stop1": "Pimpri",
                "stop2": "Deccan College",
                "cost": 20
            },
            {
                "stop1": "Pimpri",
                "stop2": "Yerwada",
                "cost": 25
            },
            {
                "stop1": "Pimpri",
                "stop2": "Wagholi",
                "cost": 35
            },
            {
                "stop1": "Dapodi",
                "stop2": "Deccan College",
                "cost": 15
            },
            {
                "stop1": "Dapodi",
                "stop2": "Yerwada",
                "cost": 20
            },
            {
                "stop1": "Dapodi",
                "stop2": "Wagholi",
                "cost": 30
            },
            {
                "stop1": "Deccan College",
                "stop2": "Yerwada",
                "cost": 15
            },
            {
                "stop1": "Deccan College",
                "stop2": "Wagholi",
                "cost": 25
            },
            {
                "stop1": "Yerwada",
                "stop2": "Wagholi",
                "cost": 15
            }
        ],
        "stops": [
            "Bhakti Shakti", "Pimpri", "Dapodi", "Deccan College", "Yerwada", "Wagholi"
        ]
    }
]

const express = require("express");
const router = express.Router();

const Bus = require('../../models/Bus');


router.get('/buses', async(req, res) => {
    let buses = await Bus.find({})
    return res.status(200).json(buses);
});

router.get('/bus/:id', async(req, res) => {
    let buses = await Bus.find({_id: req.params.id})
    if(buses.length == 0)
    {
        return res.status(404).json({
            message: "Invalid ID"
        })
    }
    return res.status(200).json(buses[0]);
});

module.exports = router;