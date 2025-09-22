const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // allow all domains
    methods: ["GET", "POST"],
  },
});

let firstClick = null;

io.on("connection", (socket) => {
  console.log("User connected");

  // send current winner if admin refreshes
  if (firstClick) {
    socket.emit("winner", firstClick);
  }

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

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ✅ simple route for Render health check
app.get("/", (req, res) => {
  res.send("Buzzer backend is running ✅");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
