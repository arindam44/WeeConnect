let user = require("../../Models/users.model");
const firebase = require("../../Config/fbConfig");
const { validateSignupData } = require("../Func/validateEmail");

const signUp = (req, res) => {
  const newUser = new user(req.body);
  const verifyuser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userHandle: req.body.userHandle,
    gender: req.body.gender,
  };

  //VALIDATE EMAIL
  const { valid, errors } = validateSignupData(verifyuser);

  if (!valid) return res.status(400).json(errors);

  const noImage = `no-image.png`;
  newUser.imageUrl = `https://firebasestorage.googleapis.com/v0/b/weconnect-7a79a.appspot.com/o/${noImage}?alt=media`;

  user.exists({ userHandle: newUser.userHandle }, (err, result) => {
    if (!result) {
      console.log("Handle Does not exist!");
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((data) => {
          const uId = data.user.uid;
          data.user
            .getIdToken()
            .then((token) => {
              newUser.fbAuthId = uId;
              newUser.bio = "";
              newUser.website = "";
              newUser.location = "";
              newUser
                .save()
                .then(() => {
                  res
                    .status(201)
                    .json({
                      message:
                        "User " + data.user.uid + " signed up successfully!",
                      token: token,
                    });
                })
                .catch((err) => {
                  console.error(err);
                  res.status(500).json({ error: err.message });
                });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ general: "Something Went Wrong. Please try again" });
        });
    } else {
      console.log(`This handle is already taken`);
      res.status(400).json({ userHandle: `This handle is already taken` });
    }
  });
};

module.exports = signUp;
