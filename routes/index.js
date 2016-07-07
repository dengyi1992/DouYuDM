var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(start)
      return res.render('index', { title: 'Express' });
  start=true;
  var rooms=[
    138286,
    65251,
    56040,
    154537,
    10903,
    4809,
    335166,
    93912,
    247634,
    321358,
    4332,
    14163,
    241823,
    67373,
    265688,
    525,
    60062,
    319538,
    17732,
    17349];
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
