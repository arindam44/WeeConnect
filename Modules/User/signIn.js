const firebase = require("../../Config/fbConfig");
const { validateLoginData } = require("../Func/validateEmail");

const signIn = (req, res) => {
  const loginUser = {
    email: req.body.email,
    password: req.body.password,
  };

  //VALIDATE EMAIL
  const { valid, errors } = validateLoginData(loginUser);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(loginUser.email, loginUser.password)
    .then((data) => {
      data.user.getIdToken().then((token) => {
        return res.status(200).json({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        return res
          .status(403)
          .json({ general: "No user found with provided credentials" });
      } else {
        return res
          .status(403)
          .json({ general: "Wrong credentials, Please try again!" });
      }
    });
};

module.exports = signIn;
