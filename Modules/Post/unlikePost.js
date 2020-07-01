const like = require('../../Models/likes.model');
const post = require('../../Models/posts.model');

const unlikePost = (req, res, next) => {
    post.findById(req.params.postId)
        .then(postdata => {
            if(postdata != null) {
                like.findOneAndDelete({'userHandle': req.user.userHandle, 'postId': req.params.postId})
                    .then(data => {
                        if(data != null) {
                            postdata.likeCount--;
                            post.updateOne({'_id': req.params.postId}, {'likeCount': postdata.likeCount})
                                .then(() => {
                                    return res.json(postdata);
                                })
                        }
                        else {
                            return res.json({ error: 'Post not liked'});
                        }
                    })
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        })
}

module.exports = unlikePost;

