const user = require("../../Models/users.model");
const post = require("../../Models/posts.model");

const getUserDetails = (req, res) => {
  let userdata = {};
  user
    .findOne({ userHandle: req.params.userHandle })
    .then((data) => {
      if (data != null) {
        userdata.user = data;
        return post
          .find({ userHandle: req.params.userHandle })
          .sort({ createdAt: -1 });
      } else {
        return res.status(404).json({ error: "User Not Found" });
      }
    })
    .then((data) => {
      userdata.posts = data;
      return res.json(userdata);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

module.exports = getUserDetails;
