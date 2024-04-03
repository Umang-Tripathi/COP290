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

        for(let pl=0;pl<rooms.length;pl++){
            if(rooms[pl].length==0){
                rooms.splice(pl,1);
            }
            if(rooms[pl].length==1){
                rooms.splice(pl,1);
            }
            else{
                if(socket.username==rooms[pl][0]){
                    rooms[pl].splice(0,1);
                    io.emit('win_by_technicality',rooms[pl][0]);
                    
                    break;
    
                }   
                else if(socket.username==rooms[pl][1]){
                    rooms[pl].splice(1,1);
                    io.emit('win_by_technicality',rooms[pl][0]);
                    break;
                }
            }
            
        }
        
        console.log("user ",socket.username," disconnected");
    });
    socket.on('name',(name)=>{
        
        if(name!=null){
            socket.username=name;
            no_room_clear=true;
            for(let pl=0;pl<rooms.length;pl++){
                if(rooms[pl].length==1 && name!=rooms[pl][0]){
                    
                    rooms[pl].push(name);
                    //console.log(name,rooms[rooms.length-1][0])
                    console.log(rooms)
                    assign_room(name,rooms[pl][0]);
                    no_room_clear=false;
                    break;

                    
                }
            }
            if(no_room_clear){
                        
                rooms.push([name]);
                console.log(rooms)
            }
            
        }
        
    })

    
    socket.on('moving_player1', (name) => {
        //console.log(name);
        io.emit('moving_player1', name);
    });
    socket.on('moving_player2', (name) => {
        //console.log(name);
        io.emit('moving_player2', name);
    });
    socket.on('moving_ball',(ball)=>{
        io.emit('moving_ball',ball);
    })
    

});
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
   
    console.log('server running at port :'+port);
    console.log("get IP adress of the server");

});
function assign_room(name1,name2){
    let total_name1=name1+"/"+name2;
    let total_name2=name2+"/"+name1;
    //console.log("hello players ",name1,name2)
    //io.emit('connecting players',total_name1);

    io.emit('connecting players 2',total_name2);

}