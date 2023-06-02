const express = require('express');
const ChatRoom = require("../models/chatRoomSchema");
const User = require("../models/userSchema");
const router = express.Router();

router.post('/',(req,res) => {

});

router.post('/rooms',(req,res) => {
    const newRoom = new ChatRoom({
        name: req.body.name,
        messages : [],
        users: req.body.users
    })
    newRoom.save();
    res.json({_id : newRoom._id});
});

router.post('/addUser/',(req,res) => {
    User.UserModel.findOne({username :req.body.username})
        .then((data)=>{
            console.log(data);
            if(!data) {
                res.json({message: "Unknown user"});
                return;
            }
            ChatRoom.findOne({
                    _id: req.body.room,
                    users : {
                        _id: data._id,
                        username: data.username,
                        firstName: data.firstName,
                        lastName: data.lastName
                    }
                }).then((result) => {
                    return !result ?ChatRoom.updateOne({_id:req.body.room},{
                    $push : {
                        users : {
                            _id: data._id,
                            username: data.username,
                            firstName: data.firstName,
                            lastName: data.lastName
                        }
                    }
                }):{message: "This user is already in room"}
                }).then((response) => {
                res.json(response)
            })
        })
});

    router.get('/rooms/:id',(req,res) => {
        ChatRoom.find({"users._id" : req.params.id})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({ message: err });
            });
    });

router.get('/oneRoom/:id',(req,res) => {
    ChatRoom.findOne({_id : req.params.id})
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

router.get('/messages/:room',(req,res) => {
    ChatRoom.findOne({_id:req.params.room})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

module.exports = router;