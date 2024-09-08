import React from 'react';
import { useEffect, useState } from 'react';

function Chat({socket, userName, room}) {
    const [currentMsg, setCurrentMsg] = useState("")
    const [msgList, setMsgList] = useState([])

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
            setMsgList((list) => [...list, msgData]);
        }
    }

    useEffect(() => {
        socket.on("receiveMsg", (data) => {
            setMsgList((list) => [...list, data]);
        });
    }, [socket]);

    return(<>
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>

        </div>
        <div className='chat-body'>
            {msgList.map((msgContent) => {

                <div className='message'>
                    <div>
                        <div className='message-content'>
                            <p>{msgContent.msg}</p>
                        </div>
                        <div className='message-meta'>
                            <p>{msgContent.time}</p>
                            <p>{msgContent.author}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
        <div className='chat-footer'>
            <input type="text" 
            onChange={(e) => {setCurrentMsg(e.target.value);}}>
            </input>
            <button onClick={sendMsg}>Send</button>
        </div>
    </div>
    </>)
}

export default Chat;