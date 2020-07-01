const notification = require('../../Models/notifications.model');

const markNotificationsRead = (req, res) => {
    //var bulk = notification.collection.initializeOrderedBulkOp();
    req.body.forEach(async (notificationId) => {
        await notification.updateOne({ '_id': notificationId }, { $set: { 'read': true } });
    });
    return res.json({ messege: 'Notifications marked read' });
/*
    bulk.execute()
        .then((result) => {
            console.log(result);
            return res.json({ messege: 'Notifications marked read' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })*/
}

module.exports = markNotificationsRead;