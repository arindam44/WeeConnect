const comment = require('../../Models/comments.model');
const post = require('../../Models/posts.model');
const notification = require('../../Models/notifications.model');

const commentNotification = () => {
    comment.watch().on('change', data => {
        if(data.operationType == 'insert') {
            console.log(data.fullDocument);
            post.findById(data.fullDocument.postId)
                .then( postdata => {
                    if(postdata != null && postdata.userHandle !== data.fullDocument.userHandle) {
                        const newNotification = new notification({
                            recipient: postdata.userHandle,
                            sender: data.fullDocument.userHandle,
                            type: 'comment',
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

module.exports = commentNotification;