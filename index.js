const express = require('express');

const socketio = require('socket.io');

const http = require('http');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const app=express();

app.use(router);

const server = http.createServer(app);

const io = socketio(server,{
    cors: {
      origin: '*',
    }
});

io.on('connection',(socket)=>{

    const {room}=socket.handshake.query;
    socket.join(room);

    socket.on('message',(message)=>{
        io.in(room).emit('message',message);
    });

    socket.on("disconnect", () => {
        socket.leave(room);
    });
});

server.listen(PORT,()=>{
    console.log(`Server Listening On Port ${PORT}...`);
});