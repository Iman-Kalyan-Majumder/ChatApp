import React, {useState} from 'react';

import {Link} from 'react-router-dom';

import './Join.css';

const Layout=()=>{
    const [name,setName]=useState("");
    const [room,setRoom]=useState("");

    return (
        <div className="joinWrapper">
            <div className="join">
                <input type="text" placeholder="Name" className="inputField" onChange={(event)=>setName(event.target.value)}/>
                <input type="text" placeholder="Room" className="inputField mt-20" onChange={(event)=>setRoom(event.target.value)}/>
                <Link onClick={(event)=>(!name || !room)? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button type="submit" className="button mt-20">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Layout;