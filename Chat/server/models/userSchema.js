const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports.UserModel = mongoose.model('Users',UserSchema);
module.exports.UserSchema = UserSchema;