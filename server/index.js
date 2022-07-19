const express = require('express');

const socketio = require('socket.io');

const http = require('http');

const router = require('./router');

const PORT = process.env.PORT || 5000;//localhost:5000 is used when the server is running locally

const app=express();

app.use(router);

const server = http.createServer(app);

//without cors, the frontend was not able to connect to the backend.
const io = socketio(server,{
    cors: {
      origin: '*',
    }
});

io.on('connection',(socket)=>{

    const {room}=socket.handshake.query;
    socket.join(room);//user joins a specific room

    socket.on('message',(message)=>{
        io.in(room).emit('message',message);
    });//upon receiving a message from the frontend, the same message is broadcasted to every user, in the room, by the backend

    socket.on("disconnect", () => {
        socket.leave(room);
    });//user leaves the room
});

//starting the server ...
server.listen(PORT,()=>{
    console.log(`Server Listening On Port ${PORT}...`);
});
