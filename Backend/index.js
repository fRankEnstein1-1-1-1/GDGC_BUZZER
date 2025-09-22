const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let firstClick = null;

io.on("connection", (socket,teamName) => {
  console.log (` User connected`);

  socket.on("buzz", (teamName) => {
    if (!firstClick) {
      firstClick = teamName;
      io.emit("winner", teamName);
    }
  });

  socket.on("reset", () => {
    firstClick = null;
    io.emit("reset");
  });
});

server.listen(4000, () => console.log("Server running on http://localhost:4000"));
