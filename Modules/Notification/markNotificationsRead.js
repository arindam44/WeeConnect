const notification = require('../../Models/notifications.model');

const markNotificationsRead = (req, res) => {
    req.body.forEach(async (notificationId) => {
        await notification.updateOne({ '_id': notificationId }, { $set: { 'read': true } });
    });
    return res.json({ messege: 'Notifications marked read' });
}

module.exports = markNotificationsRead;