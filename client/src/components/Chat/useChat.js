import {useState,useEffect,useRef} from 'react';
import socketIOClient from "socket.io-client";

const SOCKET_URL='https://chat-app-by-iman.herokuapp.com/';

const useChat=(name,room)=>{

    const [messages,setMessages]=useState([]);
    const socketRef=useRef();

    useEffect(()=>{
        //creates a connection
        socketRef.current = socketIOClient(SOCKET_URL, {
            query:room
        });
        
        socketRef.current.on('message', (message) => {
            const incomingMessage = {
              ...message,
              ownedByCurrentUser: message.id === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
            console.log(incomingMessage);
        });
        
        return () => {
            socketRef.current.disconnect();
        };
    },[room]);

    const sendMessage=(messageBody)=>{
        socketRef.current.emit('message',{
            id: socketRef.current.id,
            name: name,
            body: messageBody
        });
    }

    return {messages,sendMessage};
}

export default useChat;
