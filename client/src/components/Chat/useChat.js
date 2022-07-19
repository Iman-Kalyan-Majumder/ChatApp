import {useState,useEffect,useRef} from 'react';
import socketIOClient from "socket.io-client";

const SOCKET_URL='https://chat-app-by-iman.herokuapp.com/';//localhost:5000/ was used, to run the server locally.

//This is a custom hook
const useChat=(name,room)=>{

    const [messages,setMessages]=useState([]);//Here, the state of the component is an array containing all the messages the user should be able to see
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
        });//handles a 'message' event emitted by the backend.
        
        return () => {
            socketRef.current.disconnect();
        };//disconnects the user
    },[room]);

    const sendMessage=(messageBody)=>{
        socketRef.current.emit('message',{
            id: socketRef.current.id,
            name: name,
            body: messageBody
        });
    };//emits a 'message' event which is then handled by the backend

    return {messages,sendMessage};
}

export default useChat;
