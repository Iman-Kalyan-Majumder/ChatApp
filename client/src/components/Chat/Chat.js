import React, {useState,useRef,useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import useChat from './useChat';
import './Chat.css';

const Chat = () => {
    const [searchParams]=useSearchParams();
    const room=searchParams.get('room');
    const name=searchParams.get('name');
    const {messages,sendMessage}=useChat(name,room);
    const [message,setMessage]=useState("");
    const ref=useRef();

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior: 'smooth'});
    },[messages]);

    const handleClick=event=>{
        event.preventDefault();
        if(message)
            sendMessage(message);
        setMessage("");
    }

    return (
        <div className="outerContainer col-md-7 container-fluid">
            <div className="chat-area col-md-12">
            <div className="messages-list">
                {messages.map((message,i) => (
                    <div ref={(i===messages.length-1)? ref : null} className={`${message.ownedByCurrentUser ? "my-message-item" : "received-message-item"}`}>
                        <div className={`${message.ownedByCurrentUser ? "my-message float-right" : "received-message float-left"}`}>
                        <p>{message.ownedByCurrentUser ? "You":message.name}</p>
                        <p>{message.body}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className="container col-md-12 d-flex align-items-center justify-content-center">
                <div className="type-area">
                    <input 
                        type="text"
                        value={message}
                        onChange={event=>setMessage(event.target.value)}
                        placeholder="Message..."
                    />
                    <button type="submit" onClick={event=>handleClick(event)}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
