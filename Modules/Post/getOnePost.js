const post = require("../../Models/posts.model");
const comment = require("../../Models/comments.model");

const getOnePost = (req, res, next) => {
  let postData = {};
  post
    .findOne({ _id: req.params.postId })
    .then((data) => {
      if (data == null) {
        return res.status(404).json({ error: "Post not found" });
      }
      postData = data;
      return comment
        .find({ postId: req.params.postId })
        .sort({ createdAt: -1 });
    })
    .then((data) => {
      if (data != null) {
        let comments = [];
        data.forEach((com) => {
          comments.push(com);
        });
        return res.json({ post: postData, comments: comments });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

module.exports = getOnePost;
