import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["https://gdgc-buzzer-frtgpvjie-adithya-menons-projects-5bed7bbe.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://gdgc-buzzer-frtgpvjie-adithya-menons-projects-5bed7bbe.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

io.on("connection", (socket) => {
  console.log("User connected");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
