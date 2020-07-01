const reduceUserDetails = require('../Func/reduceUserDetails');
const user = require('../../Models/users.model');


const addUserDetails = (req, res, next) => {
    let userDetails = reduceUserDetails(req.body);
    user.updateOne({'userHandle': req.user.userHandle}, {$set: {'bio': userDetails.bio, 'website': userDetails.website, 'location': userDetails.location}})
        .then(() => {
            return res.json({ messege: 'Details Added Successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
}

module.exports = addUserDetails;