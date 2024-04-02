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
    socket.on('name',(name)=>{
        
        if(rooms.length!=0){
            if(rooms[rooms.length-1].length==1){
                rooms[rooms.length-1].push(name);
                //console.log(name,rooms[rooms.length-1][0])
                console.log(rooms)
                assign_room(name,rooms[rooms.length-1][0]);
            }
            else{
                
                rooms.push([name]);
                console.log(rooms)
            }
        }
        else{
            rooms.push([name]);
            console.log(rooms)
        }
    })
    
    socket.on('moving_player', (name) => {
        console.log(name);
        io.emit('moving_player', name);
    });
    socket.on('stop_player', (name) => {
        io.emit('stop_player', name);
    });

});
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
function assign_room(name1,name2){
    let total_name1=name1+"/"+name2;
    let total_name2=name2+"/"+name1;
    console.log("hello players ",name1,name2)
    //io.emit('connecting players',total_name1);

    io.emit('connecting players 2',total_name2);

}