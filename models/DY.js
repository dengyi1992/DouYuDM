/**
 * Created by deng on 16-7-7.
 */
var douyu = require('douyu');
var upload = require("./upload.js");
exports.Douyu = function (roomID) {
    var room = new douyu.ChatRoom(roomID);
    var data=[];
    // System level events handler
    room.on('connect', function (message) {
        console.log('DouyuTV ChatRoom #' + roomID + ' connected.');
    });
    room.on('error', function (error) {
        console.error('Error: ' + error.toString());
    });
    room.on('close', function (hasError) {
        console.log('DouyuTV ChatRoom #' + roomID + ' disconnected' + hasError ? ' because of error.' : '.');
    });

// Chat server events
    room.on('chatmsg', function(message){
        // console.log(roomID+"=========="+'[' + message.nn + ']: ' + message.txt+"  "+message.rid+" "+message.txt+" "+message.uid+" "+message.type+" ");
        message.ctime=new Date().getTime();
        data.push(message);
        if(data.length>100){
            upload.uploadSerivce(roomID,"douyu",data);
            data=[];
        }
    });

// Knock, knock ...
    room.open();

};