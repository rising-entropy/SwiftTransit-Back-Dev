const functions = require("firebase-functions");
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("./config/database").connect();

const adminLogin = require("./routes/Auth/AdminLogin");
const conductorLogin = require("./routes/Auth/ConductorLogin");
const userLogin = require("./routes/Auth/UserLogin");
const userRegistration = require("./routes/Auth/UserRegistration");
const createConductor = require("./routes/Auth/CreateConductor");

const conductor = require("./routes/Conductor/Conductor")
const user = require("./routes/User/User")

const buses = require("./routes/Bus/Bus");
const BusTravel = require("./routes/BusTravel/BusTravel");

const BusTravelTicket = require("./routes/BusTravelTicket/BusTravelTicket")
const BusTravelTicketSMS = require("./routes/BusTravelTicket/BusTravelTicketSMS")
const Payments = require("./routes/Payments/Payments")


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.json({message:'Welcome to Swift Transit!'})
})

app.use("/admin-login", adminLogin);
app.use("/conductor-login", conductorLogin);
app.use("/user-login", userLogin);
app.use("/user-registration", userRegistration);
app.use("/create-conductor", createConductor);

app.use("/conductors", conductor);
app.use("/users", user);
app.use("/buses", buses);
app.use("/bus-travel", BusTravel);
app.use("/bus-travel-ticket", BusTravelTicket);
app.use("/bus-travel-ticket-sms", BusTravelTicketSMS)
app.use("/payments", Payments)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

exports.api = functions
    .region('asia-south1')
    .https.onRequest(app)