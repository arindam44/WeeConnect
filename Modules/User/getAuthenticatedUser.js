const user = require('../../Models/users.model');
const like = require('../../Models/likes.model');
const notification = require('../../Models/notifications.model');

const getAuthenticatedUser = (req, res) => {
    let userdata= {};
    user.findOne({ 'userHandle': req.user.userHandle })
        .then(data => {
            if(data != null) {
                userdata.credentials = data;
                return like.find({'userHandle': req.user.userHandle });
            }
        })
        .then(data => {
            userdata.likes = data;
            return notification.find({ 'recipient': req.user.userHandle }).sort({ createdAt: -1}).limit(10);
        })
        .then(data => {
            userdata.notifications = data;
            return res.json(userdata);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
}

module.exports = getAuthenticatedUser;