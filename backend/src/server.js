const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const leagueRoutes = require('./routes/api/leagues');
const userRoutes = require('./routes/api/users');
const bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/api/leagues", leagueRoutes);
app.use("/api/users", userRoutes);

connectDB();

let port = 8080

app.listen(port, () => {
    console.log('server is listening at http://localhost:'+port);
})