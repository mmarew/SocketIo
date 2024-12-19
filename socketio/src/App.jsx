import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);

    // Listen for messages from the server
    newSocket.on("messageOfServer", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("messageOfClient", message);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        position: "relative",
        height: "80vh",
      }}
    >
      <h1>React + Socket.IO Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          position: "absolute",
          bottom: "0",
        }}
      >
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", width: "300px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
