const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const UserSchema = new Schema({
    Username: {
        type: String,
        //required: [true, 'Name field is required']
    },
    age: {
        type: Number
    },
    image:
    {
        data: Buffer,
        contentType: String
    },

    joined: { type: Date, default: Date.now() },
    password: { type: String },

    token: { type: String },
    
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;