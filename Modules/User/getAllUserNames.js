const user = require("../../Models/users.model");

const getAllUserNames = (req, res) => {
  user
    .find({}, { userHandle: 1, imageUrl: 1 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

module.exports = getAllUserNames;
