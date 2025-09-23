import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://gdgc-buzzer-frtgpvjie-adithya-menons-projects-5bed7bbe.vercel.app/",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

let currentWinner = null; // Add a variable to track the winner

io.on("connection", (socket) => {
  console.log("User connected");

  // Send the current winner to any new admin connecting
  if (currentWinner) {
    socket.emit("winner", currentWinner);
  }

  socket.on("buzz", (team) => {
    // Only set a winner if one hasn't been set yet
    if (!currentWinner) {
      currentWinner = team;
      io.emit("winner", currentWinner);
    }
  });

  socket.on("reset", () => {
    currentWinner = null; // Clear the winner on reset
    io.emit("reset");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT =  process.env.PORT || 4000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));