const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userHandle: {
        type: String,
        required: true,
        trim: true
    },
    postId: {
        type: String,
        required: true,
        trim: true
    },
    userImage: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;