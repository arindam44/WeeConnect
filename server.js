const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const verifyAuth = require("./Modules/Func/verifyAuth");
const uploadProfileImage = require("./Modules/User/uploadProfileImage");
const getAllPosts = require("./Modules/Post/getAllPosts");
const addOnePost = require("./Modules/Post/addOnePost");
const signUp = require("./Modules/User/signUp");
const signIn = require("./Modules/User/signIn");
const addUserDetails = require("./Modules/User/addUserDetails");
const getOnePost = require("./Modules/Post/getOnePost");
const commentOnPost = require("./Modules/Post/commentOnPost");
const likePost = require("./Modules/Post/likePost");
const unlikePost = require("./Modules/Post/unlikePost");
const deletePost = require("./Modules/Post/deletePost");
const likeNotification = require("./Modules/Notification/likeNotification");
const commentNotification = require("./Modules/Notification/commentNotification");
const deleteNotificationOnUnlike = require("./Modules/Notification/deleteNotificationOnUnlike");
const getAuthenticatedUser = require("./Modules/User/getAuthenticatedUser");
const getUserDetails = require("./Modules/User/getUserDetails");
const markNotificationsRead = require("./Modules/Notification/markNotificationsRead");
const getAllUserNames = require("./Modules/User/getAllUserNames");
const onUserImageChange = require("./Modules/Func/onUserImageChange");
const { saveChat, findThreads } = require("./Modules/Chat");

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Socket
let sockets = {};
let users = [];
io.on("connection", (sock) => {
  sock.on("join", (data) => {
    sock.handle = data.userHandle;
    sockets[sock.handle] = sock;
    let flag = 0;
    users.map((user) => {
      if (user.id == data.id) {
        flag = 1;
      }
    });
    if (flag == 0) {
      users.push(data);
      console.log(users);
    }
    io.emit("online_users", users);
  });
  sock.on("logout", (userHandle) => {
    delete sockets[userHandle];
    let index = users.indexOf(userHandle);
    users.splice(index, 1);
    io.emit("online_users", users);
  });
  sock.on("send_messege", ({ reciever, sender, body, time }) => {
    console.log("send messege---", reciever, sender, body, time);
    if (sockets[reciever] !== undefined) {
      io.to(
        sockets[reciever].emit("new_messege", {
          sender: sender,
          body: body,
          time: time,
        })
      );
    }
  });
});

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(multerMid.single("file"));

const uri =
  process.env.MONGODB_URL ||
  "mongodb+srv://Admin:Admin1@cluster0-umgvh.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`MongoDB connected!!!`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Client/build")));

  app.get("/page/*", (req, res) => {
    res.sendFile(path.join(__dirname, "Client/build/index.html"));
  });
}

//Start Server
server.listen(port, () => {
  console.log(`Server running on port ${port}!!!`);
});

//Post Routes
app.get("/posts", getAllPosts);
app.post("/post", verifyAuth, addOnePost);
app.get("/post/:postId", verifyAuth, getOnePost);
app.post("/post/:postId/comment", verifyAuth, commentOnPost);
app.get("/post/:postId/like", verifyAuth, likePost);
app.get("/post/:postId/unlike", verifyAuth, unlikePost);
app.delete("/post/:postId", verifyAuth, deletePost);

//User Routes
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post("/image", verifyAuth, uploadProfileImage);
app.post("/user", verifyAuth, addUserDetails);
app.get("/users", verifyAuth, getAllUserNames);
app.get("/user", verifyAuth, getAuthenticatedUser);
app.get("/user/:userHandle", getUserDetails);
app.post("/notifications", verifyAuth, markNotificationsRead);

//Chat Routes
app.get("/threads", verifyAuth, findThreads);
app.post("/threads", verifyAuth, saveChat);

//Notification
likeNotification();
commentNotification();
deleteNotificationOnUnlike();
onUserImageChange();
