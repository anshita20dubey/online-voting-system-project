const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const http = require("http");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const voteRoutes = require("./routes/vote");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vote", voteRoutes);

// Socket.io integration for real-time updates
io.on("connection", (socket) => {
  console.log("A user connected");

  // Emit vote results when a new client connects
  socket.emit("vote-update", getAllVotes());

  // Handle the 'new-vote' event from client-side (assuming you're using it to register votes)
  socket.on("new-vote", async (voteData) => {
    // Save the new vote (make sure your MongoDB schema allows saving votes)
    const Vote = mongoose.model("Vote", new mongoose.Schema({
      party: String,
      voter: String
    }));

    const newVote = new Vote(voteData);
    await newVote.save();

    // After saving, emit the updated results
    socket.emit("vote-update", getAllVotes()); // Emit updated vote results to the client
    io.emit("vote-update", getAllVotes()); // Emit to all clients connected
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Fetch all votes from the database
const getAllVotes = async () => {
  const Vote = mongoose.model("Vote");
  return await Vote.find({});
};

app.set("socketio", io);
app.get('/',(req, res, next) => {
   res.send('chaloooooooooooooooo');
});

const PORT = process.env.PORT || 7777;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
