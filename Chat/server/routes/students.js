const express = require('express');
const Student = require("../models/studentModel");
const router = express.Router();

router.post('/',(req,res) => {
    let student = new Student({
        id: req.body.id==null?Date.now():req.body.id,
        group: req.body.group ,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthday: req.body.birthday
    });
    if(req.body.id != null)
    {
        Student.updateOne({id: req.body.id}, req.body, {new: true})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({message:err});
            });
    }
    else
    {
        
        student.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log({message:err});
                res.json({message:err});
            });
    }
});

router.get('/',(req,res) => {
    Student.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});


router.post('/findSimilar',(req,res) => {
    Student.find({
        group: req.body.group ,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthday: req.body.birthday})
        .then(data => {
            res.json({hasSame:data.length > 0});
        })
        .catch(err => {
            res.json({ message: err });
        });
});

router.get('/:id',(req,res) => {
    Student.findOne({id: req.params.id})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

router.post('/delete',(req,res) => {
    Student.deleteOne({_id: req.body._id}) 
        .then(result => {
            if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Студента успішно видалено' });
            } else {
            res.status(404).json({ error: 'Студент не знайдений' });
            }
        })
        .catch(error => {
            console.log('Error while deleting: ', error);
            res.status(500).json({ error: 'Помилка при видаленні студента' });
        });
});

module.exports = router;