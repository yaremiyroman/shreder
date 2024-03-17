const http = require("http");
const fs = require("fs");
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const socketIO = require('socket.io');
const path = require("path");
const hostname = "0.0.0.0"; // Binding to all network interfaces
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Користувач підключився');

    socket.on('disconnect', () => {
        console.log('Користувач відключився');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
