var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var routes = require('./routes/index');
var users = require('./routes/users');
var DY = require("./models/DY.js");
var config = require("./config.js");
var HashMap = require("hashmap").HashMap;
var EventEmitter = require('events').EventEmitter;
var myEvents = new EventEmitter();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
rooms=[];
map = new HashMap();
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
var time=[];
for(var i=0;i<60;i+=15){
    time.push(i);
}
rule.minute=time;
schedule.scheduleJob(rule,function () {
    request('http://120.27.94.166:2999/getRooms?platform=douyu&topn='+config.topn, function (error, response, body) {
        if (error) {
            return console.log(error)
        }
        var parse = JSON.parse(body);
        for(var i=0;i<parse.data.length;i++){
            rooms.push(parse.data[i].room_id)
        }
        rooms.forEach(function (room) {
            if(map.get(room)==undefined||!map.get(room)){
                myEvents.emit("doit", room)
            }
        });
    });
});

myEvents.on("doit",function (room) {
    DY.Douyu(room);
});
module.exports = app;
