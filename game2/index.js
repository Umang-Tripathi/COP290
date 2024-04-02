const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
var path= require("path");
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'football.html'));
});
rooms=[]

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('moving_player', (msg) => {
        io.emit('moving_player', msg);
    });
    socket.on('stop_player', (msg) => {
        io.emit('stop_player', msg);
    });

});
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});