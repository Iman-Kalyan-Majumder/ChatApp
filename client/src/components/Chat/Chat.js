import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import useChat from './useChat';
import './Chat.css';

const Chat = () => {
    const [searchParams]=useSearchParams();
    const room=searchParams.get('room');
    const name=searchParams.get('name');
    const {messages,sendMessage}=useChat(name,room);
    const [message,setMessage]=useState("");

    const handleClick=event=>{
        event.preventDefault();
        if(message)
            sendMessage(message);
        setMessage("");
    }
    return (
        <div className="outerContainer">
            <div className="chat-area">
            <div className="messages-list">
                {messages.map((message) => (
                    <div className={`${message.ownedByCurrentUser ? "my-message-item" : "received-message-item"}`}>
                        <div className={`${message.ownedByCurrentUser ? "my-message" : "received-message"}`}>
                        <h5>{message.ownedByCurrentUser ? "You":message.name}</h5>
                        <p>{message.body}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className="container">
                <input 
                    type="text"
                    value={message}
                    onChange={event=>setMessage(event.target.value)}
                />
                <button type="submit" onClick={event=>handleClick(event)}>Send</button>
            </div>
        </div>
    );
}

export default Chat;