const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const chatSchema = new Schema(
  {
    users: [String],
    imageUrls: [
      {
        user: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    chats: [
      {
        sender: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
