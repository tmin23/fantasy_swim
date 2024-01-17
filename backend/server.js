const express = require("express");
const cors = require("cors");
const path = require("path");


var loginPage = require("./routes/loginRouter");
var app = express();

app.use(cors());
app.use("/", loginPage);
let port = 8080

app.listen(port, () => {
    console.log('server is listening at http://localhost:'+port);
})