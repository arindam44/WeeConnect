const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    userHandle: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
    },
    commentCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
