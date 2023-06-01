const express = require('express');
const UsersDB = require("../models/userSchema");
const router = express.Router();
const Users = UsersDB.UserModel;


checkDuplicateName = (req, res, next) => {
    // Username
    Users.findOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ unique: false, message: "Failed! Username is already in use!" });
            return;
        }
        else {
            res.status(400).send({ unique: true, message: "Username is available" });
            return;
        }
    });
    }

router.get('/sameName/:username',(req,res) => {
    Users.count({username: req.params.username})
        .then(data => {
            const result = data === 0?{
                isUnique: true,
                message: "Username is available" }
                : {
                isUnique: false,
                message: "Failed! Username is already in use!"
            }
            console.log(result);
            res.json(result);
        })
});

router.post('/login/',(req,res) => {
    Users.findOne({
        username:req.body.username,
        password:req.body.password
    }).then((data)=>{
        if(data)
        {
            res.json({
                isSuccess: true,
                ...data._doc
            })
        }
        else
        {
            res.json({isSuccess: false, message: "Wrong username or password"});
        }
    })
});


    router.get('/:id',(req,res) => {
        Users.findOne({_id: req.params.id})
            .then(data => {

                data = {
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username
                }
                res.json(data);
            })
            .catch(err => {
                res.json({ message: err });
            });
    });


router.get('/:id/:username',(req,res) => {
    Users.findOne({username: req.params.username})
        .then(data => {
            Users.findOne({_id: req.params.id})
                .then(secData => {
                    if(data && secData) {
                        data = [{
                            _id: data._id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            username: data.username
                        },
                            {
                                _id: secData._id,
                                firstName: secData.firstName,
                                lastName: secData.lastName,
                                username: secData.username
                            },]
                        res.json(data);
                    }
                    else {
                        res.json({message: "Unknown username"});
                    }
                })
        })
        .catch(err => {
            res.json({ message: err });
        });
});

    router.post('/createAccount',(req,res) => {
        let user = new Users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            username: req.body.username
        })
        user.save()
            .then(() => {
                console.log(user);
                res.json({ _id : user._id })
            })
    });

module.exports = router;