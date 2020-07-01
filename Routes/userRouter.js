const router = require('express').Router();
const signUp = require('../Modules/User/signUp');
const signIn = require('../Modules/User/signIn');
const verifyAuth = require('../Modules/Func/verifyAuth');


//REGISTER NEW USER
router.route('/signup').post(signUp);


//USER LOGIN
router.route('/signin').post(signIn);

//USER IMAGE UPLOAD
//router.route('/image').post(verifyAuth, uploadProfileImage);


module.exports = router;