var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("aye");
}) 

module.exports = router;