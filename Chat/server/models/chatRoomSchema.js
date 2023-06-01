const mongoose = require('mongoose');

const ChatRoomSchema = mongoose.Schema({
    name: { type: String, required: true },
    messages: [
        {
            author : { type: String, required: true },
            authorId : { type: String, required: true },
            message : { type: String, required: true },
            date : { type: String, default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() },
        }
    ],
    users: [{
        username: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        _id: { type: String, required: true },
    }]
});

module.exports = mongoose.model('ChatRoom',ChatRoomSchema);