const comment = require('../../Models/comments.model');
const post = require('../../Models/posts.model');


const commentOnPost = (req, res, next) => {
    console.log(req.body);
    if(req.body.body.trim() === '') {
        return res.status(400).json({ comment: 'Must not be Empty' });
    }
    const newComment = new comment({
    body:  req.body.body,
    postId: req.params.postId,
    userHandle: req.user.userHandle,
    userImage: req.user.imageUrl
    });

    post.findOne({'_id': req.params.postId})
        .then(postdata => {
            if(postdata === null) {
                return res.status(404).json({ error: 'Post not found'});
            }
            newComment.save()
            .then(() => {
                postdata.commentCount++;
                post.update({'_id': req.params.postId}, {'commentCount': postdata.commentCount})
                    .then(() => {
                        return res.json(newComment);
                    })
            })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong' });
        })
}

module.exports = commentOnPost;