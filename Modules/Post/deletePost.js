const post = require('../../Models/posts.model');
const comment = require('../../Models/comments.model');
const like = require('../../Models/likes.model');
const notification = require('../../Models/notifications.model');

const deletePost = (req, res, next) => {
    post.findOne({'_id': req.params.postId})
        .then(postdata => {
            if(postdata == null) {
                return res.status(404).json({error: 'Post not found'});
            }
            if(postdata.userHandle !== req.user.userHandle) {
                return res.status(403).json({error: 'Unauthorized'});
            }
            else {
                post.deleteOne({'_id': req.params.postId})
                    .then(() => {
                        comment.deleteMany({'postId': req.params.postId})
                        .then(() => {
                            like.deleteMany({'postId': req.params.postId})
                                .then(() => {
                                    notification.deleteMany({'postId': req.params.postId})
                                        .then(() => {
                                            return res.json({messege: 'Post deleted successfully'});
                                        })
                                })
                        })
                    })
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
}

module.exports = deletePost;

