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

    const {name,room}=socket.handshake.query;

    socket.join(room);
    io.in(room).emit('message',{
        id: null,
        name: "Admin",
        body:`${name} has joined the chat!`
    });
    
    socket.on('message',(message)=>{
        io.in(room).emit('message',message);
    });

    socket.on("disconnect", () => {
        io.in(room).emit('message',{
            id: null,
            name: "Admin",
            body:`${name} has left the chat!`
        });
        socket.leave(room);
    });
});

server.listen(PORT,()=>{
    console.log(`Server Listening On Port ${PORT}...`);
});
