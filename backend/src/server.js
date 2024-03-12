const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

var app = express();

app.use(cors());

connectDB();

app.get('/', (req,res) => res.send('yay'));
let port = 8080

app.listen(port, () => {
    console.log('server is listening at http://localhost:'+port);
})