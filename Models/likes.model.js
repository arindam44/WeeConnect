const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    userHandle: {
        type: String,
        required: true,
        trim: true
    },
    postId: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const like = mongoose.model('like', likeSchema);

module.exports = like;