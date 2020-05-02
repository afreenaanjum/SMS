const express = require("express");
const mongoose = require("./config/database");
const http = require("http");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
const router = require("./config/routes");
const {
  generateMessage,
} = require("./client/sms/src/components/Chat/GenerateMessage");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/sms/build")));
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(cors());
app.use(express.json());
app.use(express.static(publicDirectoryPath));

app.use("/", router);

var urlServer = null,
  connectionCount = 0,
  playStateServer = true,
  playedTimeServer = 0; // URL server has the URL of the existing session
let connectedUsers = [];
let messages = [];

io.on("connection", (socket) => {
  connectedUsers = [...connectedUsers, socket.id];
  connectionCount = connectionCount + 1;
  console.log("New WebSocket connection");

  socket.broadcast.emit("message", { text: "A new user has joined!" });

  socket.on("message", (message) => {
    messages.push(message);
    console.log("server", message, generateMessage(message, socket.id));
    io.emit("message", generateMessage(message, socket.id));
  });

  socket.on("playPause", (playState) => {
    playStateServer = playState;
    //Same playPause state is broadcasted to everyone in that socket
    socket.broadcast.emit("playState", playState);
  });

  socket.on("url", (url) => {
    urlServer = url;
    //Same URL is broadcasted to everyone in that socket
    socket.broadcast.emit("updateURL", url);
  });

  //It is listening only from host
  socket.on("onProgress", (state) => {
    playedTimeServer = state.played;
    //If user stops the video and host is still playing, to sync it with the host we are doing this
    socket.broadcast.emit("sync", { played: state.played, url: urlServer });
  });

  //This will keep the new users joining existing session updated with the URL
  socket.emit("newConnection", {
    url: urlServer,
    playStateServer: playStateServer,
  });

  socket.on("disconnect", () => {
    connectionCount = connectionCount - 1;
    connectedUsers = connectedUsers.filter((id) => {
      id !== socket.id;
    });
    console.log("Disconnected");
    if (connectionCount === 0) {
      // If there are no users in the session, on new connection again the URL is set to null
      urlServer = null;
      playedTimeServer = 0;
      playStateServer = true;
    }
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/sms/build/index.html"));
});

const port = process.env.PORT || 3005;

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
