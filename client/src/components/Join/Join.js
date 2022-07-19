import React, {useState} from 'react';

import {Link} from 'react-router-dom';

import './Join.css';

const Join=()=>{
    const [name,setName]=useState("");
    const [room,setRoom]=useState("");

    return (
        <div className="joinWrapper col-md-3">
            <div className="join col-md-12 d-flex align-items-center justify-content-center">
                <input type="text" placeholder="Name" className="inputField" onChange={(event)=>setName(event.target.value)}/>
                <input type="text" placeholder="Room" className="inputField" onChange={(event)=>setRoom(event.target.value)}/>
                <Link onClick={(event)=>(!name || !room)? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button type="submit" className="button col-md-12">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;
