import React from 'react';
import { useEffect, useState } from 'react';

function Chat({socket, userName, room}) {
    const [currentMsg, setCurrentMsg] = useState("")

    const sendMsg = async () => {
        if (currentMsg !== "") {
            const msgData = {
                room: room,
                author: userName,
                msg: currentMsg,
                time: new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes(),
            };
            await socket.emit("sendMsg", msgData);
        }
    }

    useEffect(() => {
        socket.on("receiveMsg", (data) => {
            console.log(data);
        });
    }, [socket]);

    return(<>
    <div className='chat-header'>
        <p>Live Chat</p>

    </div>
    <div className='chat-body'>

    </div>
    <div className='chat-footer'>
        <input type="text" 
        onChange={(e) => {setCurrentMsg(e.target.value);}}>
        </input>
        <button onClick={sendMsg}>Send</button>
    </div>

    </>)
}

export default Chat;