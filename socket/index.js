const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require("dotenv").config({
    path: "./.env"
})

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world")
})

server.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on port ${process.env.PORT || 4000}`)
});