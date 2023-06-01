const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    id:
    {  
        type: String,
        required: true
    },
    group:
    {
        type: String,
        required: true
    },
    firstName:
    {
        type: String,
        required: true
    },
    lastName: 
    {
        type: String,
        required: true
    },
    gender:
    {
        type: String,
        required:true
    },
    birthday:
    {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Students',StudentSchema);