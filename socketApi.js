let socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

var ofertas;

socketApi.io = io;

ofertas = []
bloqueo=false

io.on('connection', function (socket) {
    console.log('a user connected');
        io.sockets.emit('ofertas', ofertas);
    

    socket.on('new-ofert', data => {
        oferta = {
            oferta:data.oferta,
            razonsocial:data.razonsocial,
            valor:data.valor
        }
        ofertas.push(oferta)
        console.log(ofertas)
        socketApi.sendNotification();
    });
    socket.on('bloquear', data => {
        console.log('BLoqueodeSOcket')
        bloqueo = data
        socketApi.sendNotificationBloqueo();    
    });

});

socketApi.sendNotification = () => {
    io.sockets.emit('ofertas', ofertas);
}
socketApi.sendNotificationBloqueo = () => {
    io.sockets.emit('bloquear', bloqueo);      
}

module.exports = socketApi;