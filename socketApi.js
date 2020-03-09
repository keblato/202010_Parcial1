let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};


socketApi.io = io;

io.on('connection', function (socket) {

});

socketApi.sendNotification = () => {

}

module.exports = socketApi;