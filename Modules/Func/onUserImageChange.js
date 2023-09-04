const user = require("../../Models/users.model");
const comment = require("../../Models/comments.model");
const post = require("../../Models/posts.model");

const onUserImageChange = () => {
  user.watch().on("change", (data) => {
    if (data.operationType == "update") {
      if (data.updateDescription.updatedFields.imageUrl != null) {
        user.findById(data.documentKey).then((userdata) => {
          if (userdata != null) {
            post
              .updateMany(
                { userHandle: userdata.userHandle },
                {
                  $set: {
                    userImage: data.updateDescription.updatedFields.imageUrl,
                  },
                }
              )
              .then(() => {
              });
            comment
              .updateMany(
                { userHandle: userdata.userHandle },
                {
                  $set: {
                    userImage: data.updateDescription.updatedFields.imageUrl,
                  },
                }
              )
              .then(() => {
              });
          }
        });
      }
    }
  });
};

module.exports = onUserImageChange;
