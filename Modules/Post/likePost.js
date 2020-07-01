const like = require('../../Models/likes.model');
const post = require('../../Models/posts.model');

const likePost = (req, res, next) => {
    post.findById(req.params.postId)
        .then(postdata => {
            if(postdata != null) {
                like.findOne({'userHandle': req.user.userHandle, 'postId': req.params.postId})
                    .then(likedata => {
                        if(likedata != null) {
                            return res.status(500).json({error: 'Post already liked'});
                        }
                        else {
                            const newLike = new like({
                                userHandle: req.user.userHandle,
                                postId: req.params.postId
                            });
                            newLike.save()
                                .then(() => {
                                    postdata.likeCount++;
                                    post.updateOne({'_id': req.params.postId}, {'likeCount': postdata.likeCount})
                                        .then(() => {
                                            return res.json(postdata);
                                        })
                                })
                        }
                    })
            } else {
                return res.status(404).json({ error: 'Post Not Found'});
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
}

module.exports = likePost;

