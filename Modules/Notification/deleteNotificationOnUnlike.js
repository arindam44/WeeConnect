const notification = require('../../Models/notifications.model');
const like = require('../../Models/likes.model');


const deleteNotificationOnUnlike = () => {
    like.watch().on('change', data => {
        if(data.operationType == 'delete') {
            console.log(data.documentKey._id);
            notification.deleteOne({'likeId': data.documentKey._id })
                .then(() => {
                    console.log('Notification Deleted');
                })
                .catch(err => {
                    console.error(err);
                    return;
                })
        }
    })
}

module.exports = deleteNotificationOnUnlike;