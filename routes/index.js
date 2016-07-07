var express = require('express');
var DY = require("../models/DY.js");
var router = express.Router();
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var start=false;
/* GET home page. */
router.get('/', function(req, res, next) {
  if(start)
      return res.render('index', { title: 'Express' });
  start=true;
  var rooms=["84452","657604","559052","565715","564214","337449","320604","526583","271934","208114","604016"];
  rooms.forEach(function (room) {
    myEvents.emit("doit",room)
  });
  res.render('index', { title: 'Express' });
});
myEvents.on("doit",function (room) {
  DY.Douyu(room);
});
module.exports = router;
