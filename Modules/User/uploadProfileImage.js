const profileImageUploadHelper = require("../Func/profileImageUploadHelper");
const user = require("../../Models/users.model");
const post = require("../../Models/posts.model");

const uploadProfileImage = async (req, res, next) => {
  try {
    const file = req.file;
    const imageUrl = await profileImageUploadHelper(file);
    //console.log(imageUrl);
    user
      .updateOne(
        { userHandle: req.user.userHandle },
        { $set: { imageUrl: imageUrl } }
      )
      .then(() => {
        console.log("user success");
        post
          .updateMany(
            { userHandle: req.user.userHandle },
            { $set: { userImage: imageUrl } }
          )
          .then(() => {
            console.log("post success");
            return res.json({ messege: "Image uploaded successfully!" });
          });
      })
      .catch((err) => {
        return res.status(500).json({ messege: "from mongo", error: err.code });
      });
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = uploadProfileImage;
