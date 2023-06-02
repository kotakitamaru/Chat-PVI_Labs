const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const studentsRoute = require('./routes/students');
const authRoute = require('./routes/auth');
const chatRoute = require('./routes/chat');
const ChatRoom = require("./models/chatRoomSchema");
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    socket.on("join_room",(data)=>{
        socket.join(data);
    });
    socket.on("send_message",(data) => {

        socket.in(data.room).emit("recieve_message",data);
        ChatRoom.updateOne({_id:data.room},{
            $push : {
                messages : {
                    author: data.author,
                    message: data.message,
                    time: data.time,
                    authorId: data.authorId
                }
            }
        }).then(res => {
        });
    });
    socket.on("disconnect", () => {
    });
})

app.use('/students', studentsRoute);
app.use('/auth', authRoute);
app.use('/chat', chatRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});