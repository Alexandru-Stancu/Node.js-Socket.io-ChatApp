const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room name are required');
        }

        // userul se alatura unui chatroom
        socket.join(params.room);
        // socket.leave('room_name');
        // deconectam userul daca este deja conectat intr-un chatroom
        users.removeUser(socket.id);
        // adaugam userul in noul chatroom
        users.addUser(socket.id, params.name, params.room);
        // emitem un event pentru pentru a adauga userul in lista membrilor chatroom-ului
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

        callback();
    });
    // event listener pentru a crea un mesaj nou in chat
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        // vrem sa verificam daca userul exista si textul transmis este un string real (ex: fara whitespace)
        if (user && isRealString(message.text)) {
            // emite mesaj doar pe chatroom-ul pe care userul este conectat
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
    });
    // event listener pentru a crea un mesaj cu coordonatele geografice
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        // verificam daca userul exista si apoi emitem mesajul cu locatia doar catre userii din acel room
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            // daca un user iese dintr-un chatroom vom emite 2 event-uri
            // updatam lista de useri dintr-un room si anuntam faptul ca el a iesit
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });
});

server.listen(port, () => {
    console.log(`server is up on ${port}`);
});