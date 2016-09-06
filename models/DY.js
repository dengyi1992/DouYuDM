/**
 * Created by deng on 16-7-7.
 */
var douyu = require('douyu');
var upload = require("./upload.js");
exports.Douyu = function (roomID) {
    var room = new douyu.ChatRoom(roomID + '');
    var data = [];
    // System level events handler
    room.on('connect', function (message) {
        map.set(roomID,true);
        console.log('DouyuTV ChatRoom #' + roomID + ' connected.');
    });
    room.on('error', function (error) {
        console.error('Error: ' + 'roomid' + roomID + error.toString());
    });
    room.on('close', function (hasError) {
        // room=new douyu.ChatRoom(roomID+'');
        map.set(roomID,false);
        console.log('DouyuTV ChatRoom #' + roomID + ' disconnected' + hasError ? ' because of error.' : '.');
    });

// Chat server events
    room.on('chatmsg', function (message) {
        // console.log(roomID+"=========="+'[' + message.nn + ']: ' + message.txt+"  "+message.rid+" "+message.txt+" "+message.uid+" "+message.type+" ");
        message.ctime = new Date().getTime();
        data.push(message);
        if (data.length > 100) {
            upload.uploadSerivce(roomID, "douyu", data);
            data = [];
        }
    });
    // room.on('loginres', function (message) {
    //     console.log(JSON.stringify(message))
    // });
    room.on('uenter', function (message) {
        message.ctime = new Date().getTime();
        data.push(message);
        if (data.length > 100) {
            upload.uploadSerivce(roomID, "douyu", data);
            data = [];
        }
    });
    // room.on('ranklist', function (message) {
    //     console.log(JSON.stringify(message))
    // });
    // room.on('bc_buy_deserve', function (message) {
    //     console.log(JSON.stringify(message))
    // });
    // room.on('srres', function (message) {
    //     console.log(JSON.stringify(message))
    // });
    room.on('spbc', function (message) {
        message.ctime = new Date().getTime();
        data.push(message);
        if (data.length > 100) {
            upload.uploadSerivce(roomID, "douyu", data);
            data = [];
        }
    });

// Knock, knock ...
    room.open();

};