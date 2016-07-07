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
  var rooms=["321358","10000019","10001856","13703","10002242","274874","14163","84074","414818","10001568","534740"];
  rooms.forEach(function (room) {
    myEvents.emit("doit",room)
  });
  res.render('index', { title: 'Express' });
});
myEvents.on("doit",function (room) {
  DY.Douyu(room);
});
module.exports = router;
