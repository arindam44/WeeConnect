const post = require("../../Models/posts.model");
const imageUploadHelper = require("../Func/imageUploadHelper");

const addOnePost = async (req, res, next) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be Empty!" });
  }
  const newPost = new post({
    content: req.body.body,
  });
  if (req.file) {
    const imageUrl = await imageUploadHelper(req.file);
    newPost.imageUrl = imageUrl;
  }
  newPost.userImage = req.user.imageUrl;
  newPost.likeCount = 0;
  newPost.commentCount = 0;
  newPost.userHandle = req.user.userHandle;
  newPost.userId = req.user.user_id;

  newPost
    .save()
    .then(() => res.json(newPost))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = addOnePost;
