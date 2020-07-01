const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fbAuthId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userHandle: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    imageUrl: {
        type: String
    }, 
    password: {
        type: String,
        required:true,
        trim: true
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    }
});
const user = mongoose.model('user', userSchema);

module.exports = user;