const chat = require("../Models/chat.model");

const saveChat = (request, response, next) => {
  const sender = request.body.sender;
  const reciever = request.body.reciever;
  const body = request.body.body;
  const time = request.body.time;
  chat
    .findOne({ users: { $all: [sender, reciever] } })
    .then((res) => {
      if (res !== null) {
        chat
          .findOneAndUpdate(
            { users: { $all: [sender, reciever] } },
            {
              $push: {
                chats: { sender: sender, body: body, time: time },
              },
            },
            { new: true }
          )
          .then(() => {
            chat
              .find({ users: request.user.userHandle })
              .sort({ updatedAt: -1 })
              .then((data) => {
                const cleanedThread = cleanThread(
                  data,
                  request.user.userHandle
                );
                response.status(200).json(cleanedThread);
              });
          })
          .catch((err) => {
            response.json({ error: err });
          });
      } else {
        const newChat = new chat();
        newChat.users.push(sender);
        newChat.users.push(reciever);
        newChat.imageUrls.push({
          user: request.body.sender,
          url: request.user.imageUrl,
        });
        newChat.imageUrls.push({
          user: request.body.reciever,
          url: request.body.recieverImageUrl,
        });
        newChat.chats.push({
          sender: sender,
          body: body,
          time: time,
        });
        newChat
          .save()
          .then(() => {
            return chat
              .find({ users: request.user.userHandle })
              .sort({ updatedAt: -1 });
          })
          .then((data) => {
            const cleanedThread = cleanThread(data, request.user.userHandle);
            response.status(200).json(cleanedThread);
          })
          .catch((err) => {
            response.json({ error: err });
          });
      }
    })
    .catch((err) => {
      response.json({ error: err });
    });
};

const findThreads = (req, res, next) => {
  const user = req.user.userHandle;
  chat
    .find({ users: user })
    .sort({ updatedAt: -1 })
    .then((data) => {
      if (Object.keys(data).length > 0) {
        const cleanedThread = cleanThread(data, user);
        res.status(200).json(cleanedThread);
      }
    })
    .catch((err) => {
      res.json({ error: err });
    });
};

const cleanThread = (data, userHandle) => {
  data.map((thread) => {
    let index = thread.users.findIndex((item) => item === userHandle);
    thread.users.splice(index, 1);
    let imageIndex = thread.imageUrls.findIndex(
      (item) => item.user === userHandle
    );
    thread.imageUrls.splice(imageIndex, 1);
  });
  return data;
};

module.exports = { saveChat, findThreads };
