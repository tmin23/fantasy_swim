var express = require("express");
var router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../../frontend/loginsignup/build")));

router.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../../frontend/loginsignup/build", "index.html"));
}) 

module.exports = router;