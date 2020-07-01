const post = require('../../Models/posts.model');

const getAllPost = (req, res, next) => {
    post.find().sort({ createdAt: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = getAllPost;