const post = require('../../Models/posts.model');


const addOnePost = (req, res, next) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({body: 'Body must not be Empty!'});
    }
    console.log(req.body.body);
    const newPost = new post({
        content: req.body.body
    });
    newPost.userImage = req.user.imageUrl;
    newPost.likeCount = 0;
    newPost.commentCount = 0;
    newPost.userHandle = req.user.userHandle;
    newPost.userId = req.user.uid;
    console.log(newPost);
    
    newPost.save()
        .then(() => res.json(newPost))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = addOnePost;