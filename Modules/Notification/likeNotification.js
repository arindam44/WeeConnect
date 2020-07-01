const like = require('../../Models/likes.model');
const post = require('../../Models/posts.model');
const notification = require('../../Models/notifications.model');

const likeNotification = () => {
    like.watch().on('change', data => {
        if(data.operationType == 'insert') {
            post.findById(data.fullDocument.postId)
                .then( postdata => {
                        if(postdata != null && postdata.userHandle !== data.fullDocument.userHandle) {
                            const newNotification = new notification({
                                recipient: postdata.userHandle,
                                sender: data.fullDocument.userHandle,
                                type: 'like',
                                read: false,
                                postId: postdata._id,
                                likeId: data.fullDocument._id
                            });
                            return newNotification.save();
                        }
                })
                .then(() => {
                    return;
                })
                .catch(err => {
                    console.error(err);
                    return;
                })
        }
    })
}

module.exports = likeNotification;