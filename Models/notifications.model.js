const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    read: {
        type: Boolean,
        required: true,
        trim: true
    },
    postId: {
        type: String,
        required: true,
        trim: true
    },
    likeId: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const notification = mongoose.model('notification', notificationSchema);

module.exports = notification;