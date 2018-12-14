
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("splash.html", {root: "./public"});
});

module.exports = router;