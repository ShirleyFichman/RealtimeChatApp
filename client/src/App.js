import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';

const socket = io.connect("http://localhost:3001");


function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("joinRoom", room);
    }
  }

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="Name" onChange={(e) => {
        setUserName(e.target.value);
      }}/>
      <input type="text" placeholder="Room ID" onChange={(e) => {
        setRoom(e.target.value);
      }}/>
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  );
}

export default App;
