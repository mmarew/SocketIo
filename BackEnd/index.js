const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");

const app = express();
app.use(cors());

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"], // React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Define a basic route
app.get("/", (req, res) => {
  res.send("Socket.IO server is running");
});
const socketFunction = (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Listen for events from the client
  socket.on("messageOfClient", (data) => {
    console.log(`Received message: ${data}`);
    // open ai function

    socket.emit(
      "messageOfServer",
      "you send  a message to me which is called " + data
    );
  });

  // Emit events to the client
  socket.emit("messageOfServer", "Hello Client you are connectd");

  // Close the connection
  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
};
// Handle Socket.IO connections
io.on("connection", socketFunction);

// Start the server
const port = 5001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
