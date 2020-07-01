const { isEmpty } = require('../Func/validateEmail');

const reduceUserDetails = (data) => {
    let userdetails = {};
    if(!isEmpty(data.bio.trim())) userdetails.bio = data.bio;
    if(!isEmpty(data.website.trim())) {
        if(data.website.trim().substring(0, 4) !== 'http') {
            userdetails.website = 'http://' + data.website;
        }
        else {
            userdetails.website = data.website;
        }
    }
    if(!isEmpty(data.location.trim())) userdetails.location = data.location;
    
    return userdetails;
}

module.exports = reduceUserDetails;