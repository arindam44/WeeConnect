const router = require('express').Router();
const verifyAuth = require('../Modules/Func/verifyAuth');
const getAllPosts = require('../Modules/Post/getAllPosts');
const addOnePost = require('../Modules/Post/addOnePost');


router.route('/').get(verifyAuth, getAllPosts);

router.route('/add').post(verifyAuth, addOnePost);

module.exports = router;